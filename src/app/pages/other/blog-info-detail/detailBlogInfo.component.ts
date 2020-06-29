import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EditorConfig1 } from 'src/app/core/editormd/director/model/editor-config1';
import { BlogService } from 'src/app/common/service/blog.service';
import { BlogContentModel } from 'src/app/common/model/article/blogContent.model';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleModel } from 'src/app/common/model/article/article.model';
declare var editormd: any;
@Component({
  selector: 'app-more',
  templateUrl: './detailBlogInfo.component.html',
  styleUrls: ['./detailBlogInfo.component.css'],
})
export class DetailBlogInfoComponent implements OnInit, AfterViewInit {
  conf = new EditorConfig1();
  edit: any;
  id: string;
  loading = true;
  blog: ArticleModel = new ArticleModel();
  listOfTypes: any[];
  listOfType: any[] = ['JAVA', 'PATHON', 'C', 'C++', 'MYSQL'];
  perviousTagTypes: any[] = [
    {
      type: '大数据',
      tags: ['JAVA', 'PATHON', 'C', 'C++', 'MYSQL'],
    },
    {
      type: '语言',
      tags: ['JAVA', 'PATHON', 'C', 'C++'],
    },
    {
      type: '数据库',
      tags: ['PATHON', 'MYSQL'],
    },
  ];
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.conf.height = '0';
    this.edit = editormd('md2', this.conf);
    this.route.queryParams.subscribe((res) => {
      if (res.bid) {
        this.id = res.bid;
        // this.id = '1273574406067384322';
        this.getBlogContent(this.id);
      }
    });
  }
  /**
   * 查询文章数据
   * @param id id
   */
  getBlogContent(id: string) {
    setTimeout(() => {
      this.blogService.getBlogContent(id).subscribe((data: ResultSetModel) => {
        const blogContent: BlogContentModel = data.entity.blogContent;
        this.blog = data.entity;
        console.log(this.blog);
        this.conf.markdown = blogContent.contentMd;
        editormd.markdownToHTML('inner_html', this.conf);
        this.loading = false;
      });
    }, 300);
  }

  backToList() {
    this.router.navigate(['/index/blog']);
  }
}
