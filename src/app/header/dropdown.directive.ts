import { 
    Directive, 
    ElementRef, 
    HostBinding, 
    HostListener, 
    Input, 
    OnInit, 
    Renderer2 
} from "@angular/core";

@Directive({
    selector: "[cmsDropdown]"
})

export class DropdownDirective implements OnInit{
    constructor(private elRef: ElementRef, private renderer:Renderer2){}
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = "#A9A9A9";

    @HostBinding('class.open') isOpen: boolean = false;
    @HostBinding('style.backgroundColor') backgroundColor: string;
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
    @HostListener('mouseenter') mouseover(eventData: Event){
        // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "#A9A9A9");
        this.backgroundColor = this.highlightColor;
    }
    @HostListener('mouseleave') mouseleave(eventData: Event){
        // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "transparent");
        this.backgroundColor = this.defaultColor;
    }

    ngOnInit(){
        this.backgroundColor = this.defaultColor;
    }
}