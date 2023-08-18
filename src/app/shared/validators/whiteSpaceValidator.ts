import {UntypedFormControl} from '@angular/forms';
export class whiteSpaceValidator{
    static cannotContainSpace(formControl: UntypedFormControl){
        if(formControl.value.indexOf(' ')>=0){
            return {cannotContainSpace:true};
        }
        return null;
    }
}