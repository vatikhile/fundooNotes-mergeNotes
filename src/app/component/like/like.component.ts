import { Component, OnInit,Input } from '@angular/core';
import { HttpServiceService } from '../../core/service/http/http-service.service'

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
 
 
  constructor(private http:HttpServiceService) { }

  ngOnInit() {
  }


 
}
