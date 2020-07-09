import { Component, OnInit } from '@angular/core';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { BlogTypeService } from 'src/app/common/service/blogType.service';
import { TreeMoel } from 'src/app/common/model/commonmodel/tree.model';
import { NzMessageService } from 'ng-zorro-antd';
import { BlogTypeModel } from 'src/app/common/model/article/blogType.model';

@Component({
  selector: 'app-typemanage',
  templateUrl: './typemanage.component.html',
  styleUrls: ['./typemanage.component.css'],
})
export class TypeManageComponent implements OnInit {
  blogTypes: Array<TreeMoel>;
  updateTypeNameVisible = false;
  inputValue: string;
  insertTypeVisible = false;
  isOkLoading = false;
  addLevel = 0;
  currentBlogType: TreeMoel;
  constructor(
    private blogTypeService: BlogTypeService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.queryTypeTree();
  }
  /**
   * 查询文章分类树
   */
  queryTypeTree() {
    this.blogTypeService.queryTypeTreeManage().subscribe((data) => {
      console.log(data);
      const blogData: ResultSetModel = data;
      this.blogTypes = blogData.entity;
    });
  }

  /**
   * 停用启用分类
   * @param id id
   */
  updateState(id: string, state: number) {
    console.log(id, state);
    this.blogTypeService
      .updateState(id, state)
      .subscribe((data: ResultSetModel) => {
        if (data.code === 1) {
          this.message.success(data.message);
          this.queryTypeTree();
        } else {
          this.message.error(data.message);
        }
      });
  }

  /**
   * 修改按钮点击事件
   */
  updateTypeName(data: TreeMoel) {
    this.updateTypeNameVisible = true;
    this.currentBlogType = data;
    this.inputValue = data.name;
  }

  /**
   * 修改input状态
   */
  handleUpdataOk() {
    const blogType = new BlogTypeModel();
    blogType.id = this.currentBlogType.id;
    blogType.typeName = this.inputValue;
    this.blogTypeService
      .changeTypeName(blogType)
      .subscribe((data: ResultSetModel) => {
        if (data.code === 1) {
          this.message.success(data.message);
          this.queryTypeTree();
          this.updateTypeNameVisible = false;
        } else {
          this.message.error(data.message);
        }
      });
  }

  /**
   * 删除
   */
  deleteBlogType(id: number) {
    console.log(id);
    this.blogTypeService
      .deleteBlogType(`${id}`)
      .subscribe((data: ResultSetModel) => {
        if (data.code === 1) {
          this.message.success(data.message);
          this.queryTypeTree();
        } else {
          this.message.error(data.message);
        }
      });
  }

  /**
   * 树形结构转化为列表
   * @param index index
   * @param item item
   * @param flag flag
   */

  collapse(index: number, item: TreeMoel, flag: boolean) {
    const childern = item.children;
    if (flag) {
      childern.forEach((child) => {
        index++;
        this.blogTypes.splice(index, 0, child);
      });
    } else {
      this.blogTypes.splice(index + 1, childern.length);
    }
  }

  /**
   * 删除的提示消息
   */
  getDeleteMessage(level: number) {
    if (level === 1) {
      return '子级分类会被一并删除!';
    }
    return '确定删除本分类吗?';
  }

  /**
   * 新增分类的确定操作
   */
  handleOk() {
    if (this.addLevel === 1) {
      this.createType('-1');
    } else if (this.addLevel === 2) {
      if (this.currentBlogType.data.pid === '-1') {
        this.createType(this.currentBlogType.data.id);
      } else {
        this.createType(this.currentBlogType.data.pid);
      }
    }
  }

  /**
   * 新增分类点击事件
   */
  addType(level: number, data: TreeMoel) {
    this.addLevel = level;
    this.currentBlogType = data;
    this.insertTypeVisible = true;
    this.inputValue = '';
  }

  /**
   * 创建文章分类
   * @param level level
   */
  createType(pId: string) {
    const name = this.inputValue;
    // 重复检查
    let flag = false;
    this.blogTypes.forEach((node: TreeMoel) => {
      const children = node.children;
      if (node.name === name) {
        this.message.warning('重复的文章分类');
        flag = true;
        return;
      }
      if (children) {
        children.forEach((child: TreeMoel) => {
          if (child.name === name) {
            this.message.warning('重复的文章分类');
            flag = true;
            return;
          }
        });
      }
    });
    if (!flag) {
      this.isOkLoading = true;
      this.blogTypeService.createType(pId, name).subscribe(
        (data: ResultSetModel) => {
          if (data.code === 1) {
            this.message.success('新增文章分类成功');
            this.queryTypeTree();

            this.insertTypeVisible = false;
            this.currentBlogType = null;
            this.inputValue = '';
            this.isOkLoading = false;
          } else {
            this.message.error('新增文章分类失败,请重试一次吧', {
              nzDuration: 4000,
            });
            this.isOkLoading = false;
          }
        },
        (error) => {
          this.message.error('新增文章分类失败,请重试一次吧', {
            nzDuration: 4000,
          });
          this.isOkLoading = false;
        }
      );
    }
  }
}
