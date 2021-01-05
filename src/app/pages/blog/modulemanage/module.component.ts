import { Component, OnInit } from '@angular/core';
import { ResultSetModel } from 'src/app/common/model/commonmodel/resultset.model';
import { TreeMoel } from 'src/app/common/model/commonmodel/tree.model';
import { NzMessageService } from 'ng-zorro-antd';
import { BlogTypeModel } from 'src/app/common/model/article/blogType.model';
import {ModuleModel} from '../../../common/model/module/module.model';
import {ModuleService} from '../../../common/service/module.service';
import {PagesModule} from '../../pages.module';
import {MenuModel} from '../../../common/model/module/menu.model';
import {PageInfoModel} from "../../../common/model/commonmodel/pageInfo.model";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
})
export class ModuleComponent implements OnInit {

  // 模块
  modules: ModuleModel[];

  // 菜单
  menus: Array<MenuModel>;

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

  constructor(
    private moduleService: ModuleService,
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
    console.log(this.module.pageInfo);
    this.moduleService.queryModuleList(this.module).subscribe((data) => {
      console.log(data);
      const blogData: ResultSetModel = data;
      this.module.pageInfo = blogData.entity;
      this.modules = this.module.pageInfo.list;

    });
  }

  /**
   * 停用启用分类
   * @param id id
   */
  updateState(id: string, state: number) {
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
    }
  }

  /**
   * 菜单修改按钮点击事件
   */
  updateMenuInfo(data: MenuModel, index2: number, state: number) {

    // 取消修改
    if (state === 0) {
      this.currentModule.menus[index2].showInput = false;
    // 去修改
    } else if (state === 1) {
      this.menuUpdateCache = new MenuModel();
      this.menuUpdateCache.name = data.name;
      this.currentModule.menus[index2].showInput = true;
    // 确认修改
    } else {
      this.currentModule.menus[index2].name = this.menuUpdateCache.name;
      this.currentModule.menus[index2].showInput = false;
    }
  }

  /**
   * 关闭菜单抽屉
   */
  closeMenu() {
    this.showMenu = false;
  }

  changeMenuState(index: number){
    this.currentModule = this.modules[index];
    this.showMenu = !this.showMenu;
  }

  /**
   * 删除
   */
  deleteBlogType(id: string) {
  }

  /**
   * 新增分类的确定操作
   */
  handleOk() {
  }

  /**
   * 新增分类点击事件
   */
  addType(level: number, data: TreeMoel) {
  }

  /**
   * 创建文章分类
   * @param level level
   */
  createModule(pId: string, type: string) {
  }

  createMenu() {

  }
}
