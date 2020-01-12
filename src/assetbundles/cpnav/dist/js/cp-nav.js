!function(t){void 0===Craft.CpNav&&(Craft.CpNav={});var e=new Craft.AdminTable({tableSelector:"#layoutItems",sortable:!1,deleteAction:"cp-nav/layout/delete",confirmDeleteMessage:Craft.t("cp-nav","Are you sure you want to permanently delete this layout and all its settings? This cannot be undone.")});t(document).on("click","tr.layout-item a.edit-layout",(function(e){new Craft.CpNav.EditLayoutItem(t(this),t(this).parents("tr.layout-item"))})),Craft.CpNav.EditLayoutItem=Garnish.Base.extend({$element:null,data:null,layoutId:null,$form:null,$spinner:null,hud:null,init:function(e,s){this.$element=e,this.data={id:s.data("id")},this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/layout/get-hud-html",this.data,t.proxy(this,"showHud"))},showHud:function(e,s){if(this.$element.removeClass("loading"),"success"===s){var a=t();this.$form=t("<div/>"),$fieldsContainer=t('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(e.html),Craft.initUiElements($fieldsContainer);var n=t('<div class="hud-footer"/>').appendTo(this.$form),i=t('<div class="buttons right"/>').appendTo(n);this.$cancelBtn=t('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(i),this.$saveBtn=t('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(i),this.$spinner=t('<div class="spinner hidden"/>').appendTo(i),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",t.proxy(this,"closeHud")),Garnish.$bod.append(e.footerJs),this.addListener(this.$saveBtn,"click","save"),this.addListener(this.$cancelBtn,"click","closeHud")}},save:function(e){e.preventDefault(),this.$spinner.removeClass("hidden");var s=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/layout/save",s,t.proxy((function(t,e){this.$spinner.addClass("hidden"),"success"===e&&t.success?(this.$element.html("<strong>"+t.layout.name+"</strong>"),Craft.cp.displayNotice(Craft.t("cp-nav","Layout saved.")),this.closeHud()):(Craft.cp.displayError(t.error),Garnish.shake(this.hud.$hud))}),this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}}),t(document).on("click",".add-new-layout",(function(e){e.preventDefault(),new Craft.CpNav.CreateLayoutItem(t(this))})),Craft.CpNav.CreateLayoutItem=Garnish.Base.extend({$element:null,data:null,layoutId:null,$form:null,$spinner:null,hud:null,init:function(e){this.$element=e,this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/layout/get-hud-html",{},t.proxy(this,"showHud"))},showHud:function(e,s){if(this.$element.removeClass("loading"),"success"===s){var a=t();this.$form=t("<div/>"),$fieldsContainer=t('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(e.html),Craft.initUiElements($fieldsContainer);var n=t('<div class="hud-footer"/>').appendTo(this.$form),i=t('<div class="buttons right"/>').appendTo(n);this.$cancelBtn=t('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(i),this.$saveBtn=t('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(i),this.$spinner=t('<div class="spinner hidden"/>').appendTo(i),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",t.proxy(this,"closeHud")),Garnish.$bod.append(e.footerJs),this.addListener(this.$saveBtn,"click","save"),this.addListener(this.$cancelBtn,"click","closeHud")}},save:function(s){s.preventDefault(),this.$spinner.removeClass("hidden");var a=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/layout/new",a,t.proxy((function(t,s){if(this.$spinner.addClass("hidden"),"success"===s&&t.success){Craft.cp.displayNotice(Craft.t("cp-nav","Layout created."));var a=t.layouts,n=e.addRow('<tr class="layout-item" data-id="'+a.id+'" data-name="'+a.name+'"><td><a class="edit-layout"><strong>'+a.name+'</strong></a></td><td class="thin"><a class="delete icon" title="'+Craft.t("app","Delete")+'" role="button"></a></td></tr>');this.closeHud()}else Craft.cp.displayError(t.error),Garnish.shake(this.hud.$hud)}),this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}})}(jQuery),function(t){void 0===Craft.CpNav&&(Craft.CpNav={}),t(document).on("change","select#layoutId",(function(){t(this).addClass("loading"),window.location.href=Craft.getUrl("cp-nav?layoutId="+t(this).val())})),t(document).on("click",".add-new-menu-item",(function(e){new Craft.CpNav.AddMenuItem(t(this))}));var e=t(".cp-nav-notice");e.length&&(e.remove(),e.insertAfter("#global-sidebar #system-info").addClass("shown")),Craft.CpNav.AddMenuItem=Garnish.Base.extend({$element:null,data:null,navId:null,$form:null,$cancelBtn:null,$saveBtn:null,$spinner:null,hud:null,init:function(e,s){this.$element=e,this.data={layoutId:t("select#layoutId").val()},this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/navigation/get-hud-html",this.data,t.proxy(this,"showHud"))},showHud:function(e,s){if(this.$element.removeClass("loading"),"success"===s){var a=t();this.$form=t("<div/>"),$fieldsContainer=t('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(e.html),Craft.initUiElements($fieldsContainer);var n=t('<div class="hud-footer"/>').appendTo(this.$form),i=t('<div class="buttons right"/>').appendTo(n);this.$cancelBtn=t('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(i),this.$saveBtn=t('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(i),this.$spinner=t('<div class="spinner hidden"/>').appendTo(i),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",t.proxy(this,"closeHud")),new Craft.HandleGenerator("#currLabel","#handle"),Garnish.$bod.append(e.footerJs),this.addListener(this.$saveBtn,"click","saveGroupField"),this.addListener(this.$cancelBtn,"click","closeHud")}},saveGroupField:function(e){e.preventDefault(),this.$spinner.removeClass("hidden");var n=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/navigation/new",n,t.proxy((function(t,e){if(this.$spinner.addClass("hidden"),"success"===e&&t.success){Craft.cp.displayNotice(Craft.t("cp-nav","Menu saved.")),a(t.navHtml);var n=t.nav,i=s.addRow('<tr class="nav-item" data-id="'+n.id+'" data-currlabel="'+n.currLabel+'" data-name="'+n.currLabel+'"><td class="thin"><div class="field"><div class="input ltr"><div class="lightswitch on" tabindex="0"><div class="lightswitch-container"><div class="label on"></div><div class="handle"></div><div class="label off"></div></div><input type="hidden" name="navEnabled" value="1"></div></div></div></td><td data-title="'+n.currLabel+'"><a class="move icon" title="'+Craft.t("app","Reorder")+'" role="button"></a><a class="edit-nav">'+n.currLabel+'</a><span class="original-nav">('+n.currLabel+')</span></td><td data-title="'+n.currLabel+'"><span class="original-nav-link">'+n.url+'</span></td><td class="thin"><a class="delete icon" title="'+Craft.t("app","Delete")+'" role="button"></a></td></tr>');Craft.initUiElements(i),this.closeHud()}else Craft.cp.displayError(t.error),Garnish.shake(this.hud.$hud)}),this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}}),t(document).on("change","#navItems .lightswitch",(function(){var e=t(this).parents("tr.nav-item"),s=t(this).find("input:first").val(),n={value:s=s?1:0,id:e.data("id"),layoutId:t("select#layoutId").val()};Craft.postActionRequest("cp-nav/navigation/toggle",n,t.proxy((function(t,e){"success"===e&&t.success&&(Craft.cp.displayNotice(Craft.t("app","Status saved.")),a(t.navHtml))})))})),t(document).on("click","tr.nav-item a.edit-nav",(function(e){new Craft.CpNav.EditNavItem(t(this),t(this).parents("tr.nav-item"))})),Craft.CpNav.EditNavItem=Garnish.Base.extend({$element:null,data:null,navId:null,$form:null,$cancelBtn:null,$saveBtn:null,$spinner:null,hud:null,init:function(e,s){this.$element=e,this.data={id:s.data("id"),currLabel:s.data("currlabel"),layoutId:t("select#layoutId").val()},this.$element.addClass("loading"),Craft.postActionRequest("cp-nav/navigation/get-hud-html",this.data,t.proxy(this,"showHud"))},showHud:function(e,s){if(this.$element.removeClass("loading"),"success"===s){var a=t();this.$form=t("<div/>"),$fieldsContainer=t('<div class="fields"/>').appendTo(this.$form),$fieldsContainer.html(e.html),Craft.initUiElements($fieldsContainer);var n=t('<div class="hud-footer"/>').appendTo(this.$form),i=t('<div class="buttons right"/>').appendTo(n);this.$cancelBtn=t('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(i),this.$saveBtn=t('<input class="btn submit" type="submit" value="'+Craft.t("app","Save")+'"/>').appendTo(i),this.$spinner=t('<div class="spinner hidden"/>').appendTo(i),a=a.add(this.$form),this.hud=new Garnish.HUD(this.$element,a,{bodyClass:"body",closeOtherHUDs:!1}),this.hud.on("hide",t.proxy(this,"closeHud")),Garnish.$bod.append(e.footerJs),this.addListener(this.$saveBtn,"click","saveGroupField"),this.addListener(this.$cancelBtn,"click","closeHud")}},saveGroupField:function(e){e.preventDefault(),this.$spinner.removeClass("hidden");var s=this.hud.$body.serialize();Craft.postActionRequest("cp-nav/navigation/save",s,t.proxy((function(t,e){this.$spinner.addClass("hidden"),"success"===e&&t.success?(this.$element.html(t.nav.currLabel),this.$element.parents("tr.nav-item").find(".original-nav-link").html(t.nav.url),Craft.cp.displayNotice(Craft.t("app","Menu saved.")),this.closeHud(),a(t.navHtml)):(Craft.cp.displayError(t.error),Garnish.shake(this.hud.$hud))}),this))},closeHud:function(){this.hud.$shade.remove(),this.hud.$hud.remove()}}),Craft.CpNav.AlternateAdminTable=Craft.AdminTable.extend({reorderItems:function(){if(this.settings.sortable){for(var e=[],s=0;s<this.sorter.$items.length;s++){var n=t(this.sorter.$items[s]).attr(this.settings.idAttribute);e.push(n)}var i={ids:JSON.stringify(e),layoutId:t("select#layoutId").val()};Craft.postActionRequest(this.settings.reorderAction,i,t.proxy((function(t,s){"success"===s&&(t.success?(this.onReorderItems(e),Craft.cp.displayNotice(Craft.t("app",this.settings.reorderSuccessMessage)),a(t.navHtml)):Craft.cp.displayError(Craft.t("app",this.settings.reorderFailMessage)))}),this))}},deleteItem:function(e){var s={id:this.getItemId(e),layoutId:t("select#layoutId").val()};Craft.postActionRequest(this.settings.deleteAction,s,t.proxy((function(t,s){"success"===s&&(this.handleDeleteItemResponse(t,e),a(t.navHtml))}),this))}});var s=new Craft.CpNav.AlternateAdminTable({tableSelector:"#navItems",newObjectBtnSelector:"#newNavItem",sortable:!0,reorderAction:"cp-nav/navigation/reorder",deleteAction:"cp-nav/navigation/delete"}),a=function(e){t("#global-sidebar nav#nav ul").html(e)}}(jQuery),$((function(){}));