import { Component, OnInit, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

    constructor(private elRef: ElementRef, private renderer:Renderer2){}
    
    ngOnInit(){

    }
}