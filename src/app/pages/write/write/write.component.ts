import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorConfig } from 'src/app/core/editormd/director/model/editor-config';
import { EditorMdDirective } from 'src/app/core/editormd/director/editor-md.directive';
import { MdModel } from './md.content';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/common/service/blog.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from '../../../../assets/editor/jquery.min.js';
import { ArticleModel } from 'src/app/common/model/article/article.model';
import { BlogContentModel } from 'src/app/common/model/article/blogContent.model';
declare var editormd: any;

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
})
export class WriteComponent implements OnInit {
  conf = new EditorConfig();
  md: string;
  title: string;
  interval: any;
  tableTitleVisible = false;
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
  perviousTag: string[] = this.perviousTagTypes[0].tags;
  acticleRadioValue: number;
  radioValue: any = 0;
  typeValue: string[] = new Array<string>();
  publishVisible = false;
  tags: string[] = new Array<string>();
  innerTableVisible = false;
  inputVisible = false;
  tagAddVisible = true;
  isPublishLoading = false;
  summary: string;
  inputValue: string;
  visiblePerson = 0;
  article: ArticleModel = new ArticleModel();
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef;
  @ViewChild('tableTitleInput', { static: false }) tableTitleInput: ElementRef;
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  constructor(
    private router: Router,
    private blogService: BlogService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.article.blogContent = new BlogContentModel();
    this.dataOnInit();
    this.setMdConf();
    this.routeOut();
  }

  /**
   * 数据初始化
   */
  dataOnInit() {
    this.title = localStorage.getItem('blog-title');
    this.summary = localStorage.getItem('blog-summary');
    this.md = localStorage.getItem('blog-md');
    if (this.title === null || this.title === '') {
      this.titleInput.nativeElement.placeholder =
        '文章名称-ZLZBLOG(请输入文章名称)';
    } else {
      // document.getElementById('title').setAttribute('value', this.title);
    }
    if (this.md === null || this.md === '') {
      this.md = new MdModel().md;
    }
    this.conf.markdown = this.md;
  }

  /**
   * 离开当前路由
   */
  routeOut() {
    this.router.events.subscribe((event) => {
      clearInterval(this.interval);
    });
  }

  /**
   * 生成摘要
   */
  generateSummary() {
    const dom = document.createElement('div');
    dom.innerHTML = EditorMdDirective.edit.getPreviewedHTML();
    this.summary = dom.innerText.slice(0, 180);
  }

  /**
   * 按钮事件:导出到本地
   */
  exportToLocal() {
    console.log(document.getElementById('setSummary').innerText);
    // /alert('导出到本地');
  }

  /**
   * 按钮事件:打开发布文章界面
   */
  openPublishPage() {
    if (this.title === null || this.title.length === 0) {
      this.message.warning('您没有填写文章标题,请检查您的标题', {
        nzDuration: 2000,
      });
      this.title = '系统默认标题';
    }
    this.publishVisible = true;
    if (this.summary == null || this.summary === '') {
      this.generateSummary();
      setTimeout(() => {
        this.message.warning('您没有填写摘要，系统已为您自动生成摘要', {
          nzDuration: 2000,
        });
      }, 1000);
    }
  }

  /**
   * 按钮事件:发布文章
   */
  publish() {
    const md = EditorMdDirective.edit.getMarkdown();
    const html = EditorMdDirective.edit.getHTML();
    const title = this.title.trim();
    const summary = this.summary.trim();
    const typeValue = this.typeValue;
    const tags = this.tags;
    const visiblePerson = this.visiblePerson;
    const acticleRadioValue = this.acticleRadioValue;
    if (title === null || title.length === 0) {
      this.message.error('您的文章没有标题', { nzDuration: 2000 });
    } else if (md === null || md.length === 0) {
      this.message.error('您的文章没有内容', { nzDuration: 2000 });
    } else if (summary === null || summary.length === 0) {
      this.message.error('您没有填写摘要', { nzDuration: 2000 });
    } else if (typeValue.length === 0) {
      this.message.error('您没有选择分类', { nzDuration: 2000 });
    } else if (acticleRadioValue == null) {
      this.message.error('您没有选择出处', { nzDuration: 2000 });
    } else if (tags.length === 0) {
      this.message.error('您没有选择标签', { nzDuration: 2000 });
    } else if (visiblePerson == null) {
      this.message.error('您没有选择文章的可见性', { nzDuration: 2000 });
    } else {
      this.isPublishLoading = true;
      this.article.title = title;
      this.article.blogContent.contentMd = md;
      this.article.summary = summary;
      this.article.types = typeValue;
      this.article.tags = tags;
      this.article.visibleStrategy = visiblePerson;
      this.article.provenance = acticleRadioValue;
      this.article.blogContent.contentHtml = html;
      console.log(this.article);

      // 提交文章数据
      this.blogService.publicBlog(this.article).subscribe(
        (data) => {
          this.message.success('文章发布成功', { nzDuration: 4000 });
          this.isPublishLoading = false;
        },
        (error) => {
          this.message.error('文章发布失败', { nzDuration: 4000 });
          this.isPublishLoading = false;
        }
      );
    }
  }

  /**
   * 按钮事件:取消发布文章
   */
  publishCancel() {
    this.publishVisible = false;
  }

  /**
   * 发布页主题的点击事件
   */
  tableTitleClick() {
    if (!this.tableTitleVisible) {
      setTimeout(() => {
        this.tableTitleInput.nativeElement.focus();
      }, 100);
    }
    this.tableTitleVisible = !this.tableTitleVisible;
  }

  /**
   * 按钮事件:标签选择的点击事件
   */
  perviousTagsClick(type: any, index: number) {
    this.radioValue = index;
    this.perviousTag = type.tags;
  }
  /**
   * 按钮事件:关闭添加tags页面
   */
  closeTagTable() {
    this.innerTableVisible = false;
  }

  /**
   * 按钮事件:设置tag input可见
   */
  showInput() {
    this.tagAddVisible = false;
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 100);
  }

  /**
   * 按钮事件:添加标签
   */
  handleInputConfirm(tag: string) {
    if (tag) {
      this.inputValue = tag;
    }
    this.inputVisible = false;
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    if (this.tags.length < 5) {
      this.tagAddVisible = true;
    }
    this.inputValue = '';
  }

  /**
   * 按钮事件:移除标签
   * @param tag 标签
   */
  handleClose(tag: string) {
    const index: number = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
    if (this.tags.length < 5) {
      this.tagAddVisible = true;
    }
  }

  /**
   * 显示标签的字数
   * @param tag 标签
   */
  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 6;
    return isLongTag ? `${tag.slice(0, 6)}...` : tag;
  }
  /**
   * 检测输入的主题字数
   */
  canAddTitleNumber() {
    if (this.title) {
      return this.title.length;
    }
    return 0;
  }

  /**
   * 检测剩余可以添加的标签
   */
  canAddTagNumber() {
    return 5 - this.tags.length;
  }

  /**
   * 检测输入的摘要字数
   */
  canAddSummaryNumber() {
    if (this.summary) {
      return this.summary.length;
    }
    return 0;
  }

  /**
   * 本地保存
   */
  saveLocal() {
    const md = EditorMdDirective.edit.getMarkdown();
    localStorage.removeItem('blog-title');
    localStorage.removeItem('blog-md');
    localStorage.removeItem('blog-summary');
    localStorage.setItem('blog-title', this.title);
    localStorage.setItem('blog-md', md);
    localStorage.setItem('blog-summary', this.summary);
  }

  /**
   * 本地自动保存
   */
  outSaveLocal() {
    this.interval = setInterval((event) => {
      this.saveLocal();
    }, 5000);
  }

  // getMarkdown() {
  //   EditorMdDirective.edit.setPreviewTheme('light');
  //   this.md = EditorMdDirective.edit.getMarkdown();
  //   console.log(this.md);
  // }
  // htmlToMd() {
  //   // console.log(this.html);
  //   // document.getElementById('test-editormd-view').innerHTML = this.html;
  //   this.conf.markdown = this.md;
  //   editormd.markdownToHTML('test-editormd-view', this.conf);
  // }
  setMdConf() {
    this.conf.toolbarHandlers = {
      myIcon1() {
        $('#summary-back').css('visibility', 'visible');
        $('#setSummary').css('visibility', 'visible');
        $('#setSummary').css('width', '400px');
        $('#setSummary').css('height', '300px');
        $('#setSummary').css('right', '50%');
        // document.getElementById('setSummary').innerText = '123';
      },
      myIcon2() {
        const title = $('#title').val();
        const summary = $('#input_summary').val();
        if (title) {
          localStorage.removeItem('blog-title');
          localStorage.setItem('blog-title', title);
        }
        if (summary) {
          localStorage.removeItem('blog-summary');
          localStorage.setItem('blog-summary', summary);
        }
        const md = EditorMdDirective.edit.getMarkdown();
        if (md) {
          localStorage.removeItem('blog-md');
          localStorage.setItem('blog-md', md);
        }
      },
    };
  }
  backclick() {
    $('#summary-back').css('visibility', 'hidden');
    $('#setSummary').css('visibility', 'hidden');
    $('#setSummary').css('width', '0');
    $('#setSummary').css('height', '0');
    $('#setSummary').css('right', '20%');
    const summary = $('#input_summary').val();
    localStorage.removeItem('blog-summary');
    localStorage.setItem('blog-summary', summary);
  }
}
