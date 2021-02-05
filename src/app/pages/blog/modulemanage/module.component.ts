import { Component, OnInit } from '@angular/core';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import {ModuleModel} from '../../../common/model/module/module.model';
import {ModuleService} from '../../../common/service/module.service';
import {MenuModel} from '../../../common/model/module/menu.model';
import {PageInfoModel} from '../../../common/model/commonmodel/pageInfo.model';
import {MessageShowEnum} from '../../../common/constant/message.enum';
import {NzMessageService, TransferChange, TransferItem, TransferSelectChange} from 'ng-zorro-antd';
import {BlogModel} from '../../../common/model/article/blog.model';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {

  // 模块
  modules: ModuleModel[];
  // loading
  modulesLoading = true;

  // 模块列表查询条件
  module: ModuleModel;
  // 当前选中的模块
  currentModule: ModuleModel;

  // 模块标题修改缓存
  moduleUpdateCache: ModuleModel;
  // 菜单标题修改缓存
  menuUpdateCache: MenuModel;
  // 是否展示菜单
  showMenu =  false;
  // 是否展示新增框
  insertVisible = false;
  // 新增确认表单提交状态
  isInsertLoading = false;
  // 新增分类的缓存
  insertCategory = new ModuleModel();

  // 是否展示绑定文章的弹出框
  isBindingVisible = false;
  // 绑定文章表单提交loading
  isBindingConfirmLoading = false;
  // 加载绑定数据是否完成
  isLoadingBindingInfo = true;
  // 绑定文章的缓存
  bindingCache = {
    bindingCategory: new ModuleModel(),
    bindingSources: new Array<TransferItem>(),
  };

  constructor(
    private moduleService: ModuleService,
    private message: NzMessageService
  ) {

  }

  ngOnInit() {
    this.refreshModule();
  }

  /**
   * 初始化或者刷新页面
   */
  refreshModule() {
    this.module = new ModuleModel();
    this.module.pageInfo = new PageInfoModel();
    this.module.pageInfo.pageNum = 1;
    this.module.pageInfo.pageSize = 10;
    this.currentModule = new ModuleModel();
    this.currentModule.menus = [];
    this.queryTypeTree();
  }

  /**
   * 查询文章模块
   */
  queryTypeTree() {
    this.modulesLoading = true;
    this.moduleService.queryCategoryPageList(this.module, MessageShowEnum.NONE).subscribe((data) => {
      const blogData: ResultSetModel = data;
      this.module.pageInfo = blogData.entity;
      this.modules = this.module.pageInfo.list;
      this.modulesLoading = false;
    });
  }

  /**
   * 停用启用分类
   * @param id id
   */
  updateState(data: ModuleModel, index: number, state: number) {
    const module: ModuleModel = new ModuleModel();
    module.id = data.id;
    module.isPublish = state;
    this.moduleService.updateCategory(module, MessageShowEnum.NONE).subscribe((data1: ResultSetModel) => {
      if (ResultSetModel.isSuccess(data1)) {
        if (state === 1) {
          this.modules[index].isPublish = 1;
          this.message.success('停用分类成功');
        } else {
          this.modules[index].isPublish = 0;
          this.message.success('启用分类成功');
        }
      }
    });
  }

  /**
   * 模块修改按钮点击事件
   */
  updateModuleInfo(data: ModuleModel, index: number, state: number) {

    // 取消修改
    if (state === 0) {
      this.modules[index].showInput = false;
    // 去修改
    } else if (state === 1) {
      this.moduleUpdateCache = new ModuleModel();
      this.moduleUpdateCache.title = data.title;
      this.moduleUpdateCache.introduction = data.introduction;
      this.modules[index].showInput = true;
    // 确认修改
    } else {
      this.modules[index].title = this.moduleUpdateCache.title;
      this.modules[index].introduction = this.moduleUpdateCache.introduction;
      this.modules[index].showInput = false;
      const module: ModuleModel = new ModuleModel();
      module.title = this.moduleUpdateCache.title;
      module.introduction = this.moduleUpdateCache.introduction;
      module.id = data.id;
      this.moduleService.updateCategory(module).subscribe();
    }
  }


  /**
   * 展开，关闭 按钮点击
   * @param data data
   * @param index index
   */
  changeMenuState(data, index) {
    this.closeInput();
    this.currentModule = data;
    if (!this.modules[index].isExpand) {
      this.expandMenu(data, index);
    } else {
      this.removeChild(data, index);
    }
    this.modules[index].isExpand = !this.modules[index].isExpand;
  }

  /**
   * 删除
   */
  deleteBlogType(id: string) {
    const module: ModuleModel = new ModuleModel();
    module.id = id;
    module.isDeleted = 1;
    this.moduleService.updateCategory(module, MessageShowEnum.NONE).subscribe((data: ResultSetModel) => {
      if (ResultSetModel.isSuccess(data)) {
        this.message.success('删除分类成功');
        this.refreshModule();
      }
    });
  }

  /**
   * 展开之后向数组中添加子级
   * @param data data
   * @param index index
   */
  expandMenu(data: ModuleModel, index) {
    const module = new ModuleModel();
    const pageInfo = new PageInfoModel();
    pageInfo.pageNum = 1;
    pageInfo.pageSize = 10000;
    module.pageInfo = pageInfo;
    module.level = data.level + 1;
    module.parentId = data.id;
    this.moduleService.queryCategoryPageList(module, MessageShowEnum.NONE).subscribe((result: ResultSetModel) => {
      this.addChild(result.entity.list, index);
    });
  }

  /**
   * 列表中插入元素
   */
  addChild(children: ModuleModel[], index) {
    this.modules[index].children = children;
    children.forEach(child => {
      this.modules.splice(++index, 0, child);
    });
  }

  /**
   * 移除子级
   * @param data data
   * @param index index
   */
  removeChild(data: ModuleModel, index) {
    if (data.children && data.children.length > 0) {
      let i = index;
      data.children.forEach((cate: ModuleModel) => {
        this.removeChild(cate, i++);
      });
      console.log('开始移除：' + data.title + '的子级');
      console.log(data.children);
      this.modules.splice(index + 1, data.children.length);
      data.children = null;
    }
  }

  /**
   * 关闭所有的输入框
   */
  closeInput() {
    this.modules.forEach(data => {
      data.showInput = false;
    });
  }

  /**
   * 新增分类的确定操作
   */
  handleOk() {
  }

  /**
   * 新增分类点击事件
   */
  addType(type: number, index: number) {
    this.insertVisible = true;
    // 新增同级
    if (type === 1) {
      this.insertCategory.parentId = this.modules[index].parentId;
      this.insertCategory.level = this.modules[index].level;
    } else if (type === 2){
      this.insertCategory.parentId = this.modules[index].id;
      this.insertCategory.level = this.modules[index].level + 1;
    } else if (type === 3) {
      this.insertCategory.parentId = '0';
      this.insertCategory.level = 1;
    }
  }

  handleInsertCancel() {
    this.insertVisible = false;
  }

  handleInsertOk() {
    this.isInsertLoading = true;
    const category = this.insertCategory;
    this.moduleService.createCategory(category).subscribe(data => {
      this.refreshModule();
      this.isInsertLoading = false;
      this.insertVisible = false;
      this.insertCategory = new ModuleModel();
    });
  }

  select(ret: TransferSelectChange): void {
  }

  change(ret: TransferChange): void {
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');
    // @ts-ignore
    this.bindingCache.bindingSources = this.bindingCache.bindingSources.map((e: TransferItem) => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }

  /**
   * 分类绑定文章
   */
  bindingBlog(index: number) {
    this.isLoadingBindingInfo = true;
    this.isBindingVisible = true;
    this.bindingCache.bindingCategory = this.modules[index];
    // 获取未分类的文章列表，放到右边的穿梭框中
    this.moduleService.queryBlogFreedom().subscribe((res: ResultSetModel) => {
      if (ResultSetModel.isSuccess(res)) {
        const blogs: Array<BlogModel> = res.entity;
        blogs.forEach((blog: BlogModel) => {
          const trans: TransferItem = {
            key: '',
            title: '',
            description: '',
            direction: 'right',
            disabled: false,
            checked: false,
            hide: false
          };
          trans.key = blog.id;
          trans.title = blog.title;
          trans.description = blog.summary;
          this.bindingCache.bindingSources.push(trans);
        });

        // 查询当前文章下的分类
        this.moduleService.queryCategoryBlog(this.bindingCache.bindingCategory.id).subscribe((res2: ResultSetModel) => {
          if (ResultSetModel.isSuccess(res2)) {
            const blogs2: Array<BlogModel> = res2.entity;
            blogs2.forEach((blog2: BlogModel) => {
              const trans2: TransferItem = {
                key: '',
                title: '',
                description: '',
                direction: 'left',
                disabled: false,
                checked: false,
                hide: false
              };
              trans2.key = blog2.id;
              trans2.title = blog2.title;
              trans2.description = blog2.summary;
              this.bindingCache.bindingSources.push(trans2);
            });
            this.isLoadingBindingInfo = false;
          }
        });
      }
    });
  }

  /**
   * 取消绑定文章
   */
  handleBindingCancel() {
    this.isBindingVisible = false;
    this.isLoadingBindingInfo = true;
    this.bindingCache.bindingSources = new Array<TransferItem>();
  }

  /**
   * 确定绑定文章
   */
  handleBindingOk() {
    this.isBindingConfirmLoading = true;
    const blogs = [];
    this.bindingCache.bindingSources.forEach(data => {
      if (data.direction === 'left') {
        const blog = {id: ''};
        blog.id = data.key;
        blogs.push(blog);
      }
    });
    this.bindingCache.bindingSources = new Array<TransferItem>();
    this.isLoadingBindingInfo = true;
    const category = new ModuleModel();
    category.id = this.bindingCache.bindingCategory.id;
    category.blogs = blogs;
    this.moduleService.updateCategoryBlog(category).subscribe((res: ResultSetModel) => {
      if (ResultSetModel.isSuccess(res)) {
        this.isBindingConfirmLoading = false;
        this.isBindingVisible = false;
        this.refreshModule();
      }
    });
  }
}
