import { Injectable } from '@angular/core';
import { BreadCrumbItem } from '../../models/breadCrumbItem';


@Injectable()
export class BreadCrumbSession {


    items: BreadCrumbItem[] = [];

    setShowOptionOnLastItem() {
        const lastItem = this.items[this.items.length - 1];
        lastItem.ShowOption = true;
    }


    init(): any {
        this.items = [];
        this.push('root', 'My Drive');
    }

    push(id: string, name: string) {
        this.items.forEach((crumb) => crumb.ShowOption = false);
        const item = new BreadCrumbItem();
        item.Id = id;
        item.Name = name;
        this.items.push(item);
        this.setShowOptionOnLastItem();
    }

    navigateTo(id: string, name: string) {
        let foundIndex = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].Id === id) {
                foundIndex = i;
                break;
            }
        }
        if (foundIndex >= 0) {
            this.items = this.items.slice(0, foundIndex + 1);
            this.setShowOptionOnLastItem();
        } else {
          this.push(id, name);
        }
    }

    get currentItem(): BreadCrumbItem {
        return this.items[this.items.length - 1];
    }
}
