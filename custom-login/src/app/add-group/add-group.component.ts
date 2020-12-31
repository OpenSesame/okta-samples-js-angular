import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  @Input() blah: any;

  constructor() { }

  ngOnInit(): void {
  }

}
