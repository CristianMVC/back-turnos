import { ComponentFactoryResolver, Injectable, ViewContainerRef, ComponentRef } from '@angular/core'

import { DynamicComponent } from '../campo-option.component'

@Injectable()
export class AddDynamicComponentService {
  rootViewContainer: ViewContainerRef

  private components: ComponentRef<DynamicComponent>[] = []

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  public addDynamicComponent(value?: string | undefined, key?: string | undefined) {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent)
    const componentRef = this.rootViewContainer.createComponent(factory);
    componentRef.instance.option = value;
    componentRef.instance.key = key;
    this.components.push(componentRef);
  }

  getOptions() {
    return this.components.map((cref: ComponentRef<DynamicComponent>) => {
        return {'option': cref.instance.option, 'key': cref.instance.key};
    })
  }

  resetOptions() {
    this.components.map((cref: ComponentRef<DynamicComponent>) => {
        return cref.destroy();
    })
    this.components = [];
  }
}
