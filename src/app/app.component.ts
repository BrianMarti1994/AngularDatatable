import { Component ,OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import{HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

// We use this trigger because fetching the list of employee can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  employee :object;
constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getEmployeeData()
  }
  

getEmployeeData()
{
  this.http.get('assets/Employee.json').subscribe(data => {
    this.employee =data
  
    // Calling the DT trigger to manually render the table
    this.dtTrigger.next();
  });
  
}
ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}
}

