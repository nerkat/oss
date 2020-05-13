import { Injectable,Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
ApplicationRef, Renderer2, RendererFactory2  } from '@angular/core';
import { UserViewDialogComponent } from './user-view-dialog/user-view-dialog.component';
import { Subject } from 'rxjs';
@Injectable()
export class InjiService {

renderer : Renderer2;
public componentSubjects: { [id: string]: Subject<any> } = {};
public updateRowSubjects = new Subject();

constructor(
  private componentFactoryResolver: ComponentFactoryResolver,
  private appRef: ApplicationRef,
  private injector: Injector,
  rendererFactory: RendererFactory2,
) {
  this.renderer = rendererFactory.createRenderer(null, null);
}

//render in injectable service https://stackoverflow.com/questions/44989666/service-no-provider-for-renderer2
appendComponent(component: any, data:any, selected:any) {

  // 1. Create a component reference from the component 
  const componentRef = this.componentFactoryResolver
    .resolveComponentFactory(component)
    .create(this.injector);

    (<UserViewDialogComponent>componentRef.instance).data = data;
    (<UserViewDialogComponent>componentRef.instance).ref = componentRef;
    (<UserViewDialogComponent>componentRef.instance).myParent = selected;
  
  // 2. Attach component to the appRef so that it's inside the ng component tree
  this.appRef.attachView(componentRef.hostView);
  
  // 3. Get DOM element from component
  const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  
  // 4. Append DOM element to the body
  var tr = document.createElement("tr");
  tr.appendChild(domElem);
  let selectedRow = selected;//.closest(".ng2-smart-row");
  if(selectedRow){
    let nextSib = this.renderer.nextSibling(selectedRow);
    this.renderer.insertBefore(selectedRow.parentNode, tr, nextSib);
  }

  return componentRef;
}

removeComponent(component: any, parent){
  this.appRef.detachView(component.hostView);
  component.destroy();

  let nextSib = parent.nextSibling;
  nextSib.remove();
}

}