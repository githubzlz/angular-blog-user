import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorConfig1 } from 'src/app/core/editormd/director/model/editor-config1';
import { EditorMdDirective } from 'src/app/core/editormd/director/editor-md.directive';
import { MdModel } from './md.content';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/common/service/blog.service';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from '../../../../assets/editor/jquery.min.js';
import { ArticleModel } from 'src/app/common/model/article/article.model';
import { BlogContentModel } from 'src/app/common/model/article/blogContent.model';
import { FileService } from 'src/app/common/service/file.service';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { BlogTypeService } from 'src/app/common/service/blogType.service';
import { TreeMoel } from 'src/app/common/model/commonmodel/tree.model';
import { BlogTagService } from 'src/app/common/service/blogTag.service';
import { BlogTagType } from 'src/app/common/model/tag/blogTagType.model';
import { BlogTagModel } from 'src/app/common/model/tag/blogTag.model';
import { BlogTypeModel } from 'src/app/common/model/article/blogType.model';
declare var editormd: any;

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
})
export class WriteComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fileService: FileService,
    private blogTypeService: BlogTypeService,
    private message: NzMessageService,
    private blogTag: BlogTagService
  ) {}
  conf = new EditorConfig1();
  md: string;
  title: string;
  interval: any;
  tableTitleVisible = false;
  listOfType: any[] = ['JAVA', 'PATHON', 'C', 'C++', 'MYSQL'];
  perviousTagTypes: BlogTagType[];
  perviousTag: BlogTagModel[] = [];
  acticleRadioValue = '0';
  radioValue: any = 0;
  typeValue: string[] = new Array<string>();
  publishVisible = false;
  tags: BlogTagModel[] = new Array<BlogTagModel>();
  innerTableVisible = false;
  inputVisible = false;
  tagAddVisible = true;
  isPublishLoading = false;
  summary: string;
  inputValue: string;
  visiblePerson = '0';
  article: ArticleModel = new ArticleModel();
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef;
  @ViewChild('tableTitleInput', { static: false }) tableTitleInput: ElementRef;
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  visibleTypeModal = false;
  addTypeModalOkLoading = false;
  blogTypes: Array<TreeMoel>;
  blogTypeNodes: Array<any> = new Array();
  typeValueNodeVisiable = true;
  blogTypeChildren: Array<TreeMoel>;
  currentBlogTypeNode: TreeMoel;
  addTypeInputVisible1 = false;
  addTypeInputVisible2 = false;
  acticleTypeValue = '0';
  ngOnInit() {
    this.article.blogContent = new BlogContentModel();
    this.routeDataInit();
    // this.dataOnInit();
    this.routeOut();
  }

  routeDataInit() {
    this.route.queryParams.subscribe(async (res) => {
      this.dataOnInit(null);
    });
  }

  /**
   * 查询文章数据
   * @param id id
   */
  getBlogContent(id: string) {
    return new Promise((resolve, reject) => {
      this.blogService.getBlogContent(id).subscribe((data: ResultSetModel) => {
        this.dataOnInit(data.entity);
        resolve(1);
      });
    });
  }

  /**
   * 数据初始化
   */
  dataOnInit(blog: ArticleModel) {
    if (!blog) {
      this.title = localStorage.getItem('blog-title');
      this.summary = localStorage.getItem('blog-summary');
      this.md = localStorage.getItem('blog-md');
    } else {
      this.title = blog.title;
      this.summary = blog.summary;
      this.conf.markdown = blog.blogContent.contentMd;
    }
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
    this.queryTagTypes();
    this.setMdConf();
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
    let filename = 'blog.md';
    if (this.title) {
      filename = this.title + '.md';
    }
    const md = EditorMdDirective.edit.getMarkdown();
    this.download(filename, md);
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
    this.queryTypeTree();
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
      this.article.types = this.getTypeValue();
      this.article.tags2 = tags;
      this.article.visibleStrategy = visiblePerson;
      this.article.provenance = acticleRadioValue;
      this.article.blogContent.contentHtml = html;

      // 提交文章数据
      this.blogService.publicBlog(this.article).subscribe(
        (data: ResultSetModel) => {
          if (data.code === 1) {
            this.message.success('文章发布成功', { nzDuration: 4000 });
            this.isPublishLoading = false;
            setTimeout(() => {
              this.publishVisible = false;
            }, 500);
          } else {
            this.message.error('文章发布失败', { nzDuration: 4000 });
            this.isPublishLoading = false;
          }
        },
        (error) => {
          this.message.error('文章发布失败', { nzDuration: 4000 });
          this.isPublishLoading = false;
        }
      );
    }
    // 刷新标签数据
    this.queryTagTypes();
  }

  /**
   * 获取文章分类
   */
  getTypeValue() {
    const typeValue1 = [];
    this.blogTypeNodes.forEach((node) => {
      this.typeValue.forEach((value) => {
        if (value === node.key) {
          typeValue1.push(node.title);
        }
      });
      const children: [] = node.children;
      if (children) {
        children.forEach((nodec: any) => {
          this.typeValue.forEach((value) => {
            if (value === nodec.key) {
              typeValue1.push(nodec.title);
            }
          });
        });
      }
    });
    return typeValue1;
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
    this.queryTags(type.id);
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
  handleClickConfirm(tag: BlogTagModel) {
    // 检查是否有重复
    let repeat = false;
    this.tags.forEach((item) => {
      if (item.name === tag.name) {
        repeat = true;
        return;
      }
    });
    // 不重复则添加标签
    if (!repeat) {
      this.tags.push(tag);
    }
  }

  handleInputConfirm() {
    // 检查是否有重复
    let repeat = false;
    this.tags.forEach((item) => {
      if (item.name === this.inputValue) {
        repeat = true;
        return;
      }
    });
    // 不重复则添加标签
    if (!repeat) {
      const tag = new BlogTagModel();
      tag.name = this.inputValue;
      tag.typeId = '-1';
      this.tags.push(tag);
      this.inputValue = '';
      this.inputVisible = false;
      this.tagAddVisible = true;
    } else {
      this.message.info('无法添加重复的标签');
    }
  }

  /**
   * 按钮事件:移除标签
   * @param tag 标签
   */
  handleClose(tag: BlogTagModel) {
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
    if (tag) {
      const isLongTag = tag.length > 6;
      return isLongTag ? `${tag.slice(0, 6)}...` : tag;
    }
    return '';
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
      myIcon3() {
        $('#file_upload').css('visibility', 'visible');
        $('#file_background').css('visibility', 'visible');
        $('#file_upload').css('top', '320px%');
        $('#file_upload').css('width', '400px');
        $('#file_upload').css('height', '200px');
        $('#file_upload').css('right', '60%');
      },
    };
  }

  /**
   * 文件上传
   */
  fileSubmit() {
    const formdata = new FormData();
    formdata.append('filename', $('#file_upload_image')[0].files[0]);
    $.ajax({
      // 请求方式
      type: 'POST',
      // 请求地址
      url: 'https://www.zlztsb.com:80/blog-server/file/image/upload',
      // 数据，json字符串
      data: formdata,
      contentType: false,
      processData: false,
      // 请求成功
      success(result: ResultSetModel) {
        const path = result.entity;
        EditorMdDirective.edit.insertValue('![](' + path + ')');
        $('#file_upload').css('visibility', 'hidden');
        $('#file_background').css('visibility', 'hidden');
      },
      // 请求失败，包含具体的错误信息
      error(e: any) {
        console.log(e);
      },
    });
  }

  /**
   * 背景点击
   */
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

  /**
   * 背景点击
   */
  fileBackgroundClick() {
    $('#file_background').css('visibility', 'hidden');
    $('#file_upload').css('visibility', 'hidden');
    $('#file_upload').css('width', '0');
    $('#file_upload').css('height', '0');
    $('#file_upload').css('right', '20%');
  }

  /**
   * 本地下载
   * @param filename filename
   * @param text text
   */
  download(filename: string, text: string) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);
    element.style.visibility = 'hidden';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  /**
   * 查询文章分类树
   */
  queryTypeTree() {
    this.blogTypeService
      .queryTypeTree(this.acticleTypeValue)
      .subscribe((data) => {
        const blogData: ResultSetModel = data;
        this.blogTypes = blogData.entity;
        this.getNodeModel();
        this.blogTypeChildren = this.blogTypes[0].children;
      });
  }

  /**
   * 创建树节点
   */
  getNodeModel() {
    this.blogTypeNodes = new Array();
    this.blogTypes.forEach((blogType) => {
      const nodes = {
        title: blogType.data.typeName,
        key: blogType.data.id,
        children: new Array(),
      };
      if (blogType.children) {
        blogType.children.forEach((child) => {
          const cnode = {
            title: child.data.typeName,
            key: child.data.id,
            children: new Array(),
            isLeaf: true,
          };
          nodes.children.push(cnode);
        });
      }
      this.blogTypeNodes.push(nodes);
    });
  }

  /**
   * 选择文章分类时的处理
   */
  onTypeValueChange() {
    if (this.typeValue.length > 2) {
      this.typeValue.splice(2, 1);
      this.typeValueNodeVisiable = false;
      setTimeout(() => {
        this.typeValueNodeVisiable = true;
      }, 10);
      this.message.warning('最多可以添加两个分类');
    }
  }
  /**
   * 二级分类设置
   * @param node node
   */
  setChildrenList(node: TreeMoel) {
    this.blogTypeChildren = node.children;
    this.currentBlogTypeNode = node;
  }

  showAddTypeInput(type: number) {
    if (type === 1) {
      this.addTypeInputVisible1 = true;
    } else {
      this.addTypeInputVisible2 = true;
    }
    setTimeout(() => {
      document.getElementById('addTypeInput' + type).focus();
    }, 100);
  }

  handleTypesConfirm(type: number) {
    if (type === 1) {
      if (this.addTypeInputVisible1 === true) {
        this.addTypeInputVisible1 = false;
        this.createType(1);
      }
    }
    if (type === 2) {
      if (this.addTypeInputVisible2 === true) {
        this.addTypeInputVisible2 = false;
        this.createType(2);
      }
      return;
    }
  }

  /**
   * 创建文章类型
   */
  createType(level: number) {
    let pId: string;
    let name: string;
    if (level === 1) {
      pId = '-1';
    } else {
      pId = this.currentBlogTypeNode.id;
    }
    name = this.inputValue;

    // 重复检查
    let flag = false;
    this.blogTypeNodes.forEach((node: any) => {
      const children = node.children;
      if (children) {
        children.forEach((child: any) => {
          if (child.title === this.inputValue) {
            this.message.warning('重复的文章分类');
            flag = true;
          }
        });
      }
      if (node.title === this.inputValue) {
        this.message.warning('重复的文章分类');
        flag = true;
      }
    });
    if (!flag) {
      this.blogTypeService
        .createType(pId, name, this.acticleTypeValue)
        .subscribe(
          (data: ResultSetModel) => {
            if (data.code === 1) {
              this.queryTypeTree();
              this.message.success('新增文章分类成功');
            } else {
              this.message.error('新增文章分类失败,请重试一次吧', {
                nzDuration: 4000,
              });
            }
          },
          (error) => {
            this.message.error('新增文章分类失败,请重试一次吧', {
              nzDuration: 4000,
            });
            this.isPublishLoading = false;
          }
        );
    }

    this.inputValue = '';
  }

  /**
   * 查询标签分类
   */
  queryTagTypes() {
    this.blogTag.queryTagType().subscribe((data: ResultSetModel) => {
      this.perviousTagTypes = data.entity;
      this.queryTags(this.perviousTagTypes[0].id);
    });
  }

  /**
   * 查询标签
   */
  queryTags(typeId: string) {
    this.blogTag.queryTag(typeId).subscribe((data: ResultSetModel) => {
      this.perviousTag = [];
      const tags: any[] = data.entity;
      tags.forEach((item) => {
        this.perviousTag.push(item);
      });
    });
  }

  // /**
  //  * 处理列表数组
  //  */
  // collapse(index: number, item: TreeMoel, flag: boolean) {
  //   const childern = item.children;
  //   if (flag) {
  //     childern.forEach((child) => {
  //       index++;
  //       this.blogTypes.splice(index, 0, child);
  //     });
  //   } else {
  //     this.blogTypes.splice(index + 1, childern.length);
  //   }
  // }
}
