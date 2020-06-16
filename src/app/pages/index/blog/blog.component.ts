import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/common/service/blog.service';
import { PageInfoModel } from 'src/app/common/model/commonmodel/pageInfo.model';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { NzMessageService } from 'ng-zorro-antd';
import { ArticleModel } from 'src/app/common/model/article/article.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private message: NzMessageService
  ) {}
  pageInfo: PageInfoModel = new PageInfoModel();
  resultSet: ResultSetModel = new ResultSetModel();
  articles: Array<ArticleModel> = new Array();
  deletedMap: Map<string, string> = new Map<string, string>();
  // 查询未删除条件
  deletedExclude: any = {
    column: 'isDeleted',
    value: '0',
  };
  // 审核条件
  showExclude: any = {
    column: 'isShow',
    value: '1',
  };
  // 编辑缓存
  editCache: { [key: string]: { edit: boolean; data: ArticleModel } } = {};
  ngOnInit() {
    this.listInit(1, 10);
  }
  /**
   * 初始化表格数据
   * @param num num
   * @param size size
   */
  listInit(num: number, size: number) {
    this.pageInfo.pageNum = num;
    this.pageInfo.pageSize = size;
    this.pageInfo.exclude.push(this.deletedExclude);
    this.pageInfo.exclude.push(this.showExclude);
    this.selectList();
    console.log(JSON.stringify(this.pageInfo));
  }

  /**
   * 开始编辑表格
   * @param index index
   * @param id id
   */
  editArtcle(index: number, id: string) {
    this.editCache[id].edit = true;
  }

  /**
   * 保存编辑内容
   * @param index index
   * @param id id
   */
  saveEdit(index: number, id: string) {
    Object.assign(this.articles[index], this.editCache[id].data);
    console.log(this.editCache[id]);
    this.editCache[id].edit = false;
  }

  /**
   * 放弃编辑
   * @param index index
   * @param id id
   */
  cancelEdit(index: number, id: string) {
    this.editCache[id] = {
      data: { ...this.articles[index] },
      edit: false,
    };
  }

  /**
   * 换页
   * @param data data
   */
  nzPageIndexChange(data: number) {
    this.pageInfo.pageNum = data;
    this.selectList();
  }

  /**
   * 设置每页的数量
   * @param data data
   */
  nzPageSizeChange(data: number) {
    this.pageInfo.pageSize = data;
    this.selectList();
  }

  /**
   * 更新表格编辑的缓存
   */
  updateEditCache(): void {
    this.articles.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  /**
   * 列表查询
   */
  selectList() {
    this.blogService.selectList(this.pageInfo).subscribe(
      (data) => {
        this.resultSet = data;
        this.pageInfo = this.resultSet.entity;
        this.articles = this.pageInfo.list;
        this.updateEditCache();
      },
      (error) => {
        // this.message.error('查询列表失败,请重试', { nzDuration: 4000 });
      }
    );
  }

  /**
   * 删除文章
   * @param id id
   */
  deletedArtcle(id: string) {
    console.log(id);
    this.blogService.deletedArtcle(id).subscribe(
      (data) => {
        this.resultSet = data;
        if (this.resultSet.code === 1) {
          this.listInit(this.pageInfo.pageNum, this.pageInfo.pageSize);
          this.message.success('删除成功,您还可以在回收站中找到它', {
            nzDuration: 4000,
          });
        } else {
          this.message.error('文章删除失败,请重试', { nzDuration: 4000 });
        }
      },
      (error) => {
        this.message.error('文章删除失败,请重试', { nzDuration: 4000 });
      }
    );
  }
}
