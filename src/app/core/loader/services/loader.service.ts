import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class LoaderService {
    public isLoading = new BehaviorSubject<boolean>(false);

    show(){
        this.isLoading.next(true);
    }

    hide(){
        this.isLoading.next(false);
    }

    estaCarregando(){
        return this.isLoading.asObservable();
    }
}