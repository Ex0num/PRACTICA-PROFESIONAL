import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js'
import { FirestoreService } from '../Servicios/firestore.service';
import { PhotoService } from '../Servicios/photo.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit{

  constructor(private routerRecieved:Router, public srvFotos:PhotoService) {}

  //#region ---------------- GRAFICO DE BARRA --------------------------------------------------------------------

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataset[] = [{ data: [3, 2], label: 'Cargando' },];

  public barChartLabels: any = ['Cargando', 'Cargando'];

  public barChartOptions = 
  {
    responsive: true,
  };
  //#endregion // --------------------------------------------------------------------------------------------------

  //#region  // ---------------- GRAFICO DE TARTA -----------------------------------------------------------------
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartType: ChartType  = 'pie';
  public pieChartData: ChartDataset[] =  [{ data: [4, 2], label: 'Las cosas más lindas' },];
  
  public pieChartLabels: any = ['Cargando', 'Cargando'];

  public pieChartOptions =
  {
    responsive: true,
  };

  //#endregion --------------------------------------------------------------------------------------------------

  ngOnInit()
  {
    setTimeout( ()=>
    { 
      this.cargarData();

      let graphs = document.getElementById("graphs");
      graphs.removeAttribute("hidden");

    },2000);
  }

  public async cargarData()
  {
    //BARRA PARA LAS COSAS MAS FEAS
    this.cargarDataBarChart();

    //TORTA PARA LAS COSAS MAS LINDAS
    this.cargarDataPieChart();
  }

  private async cargarDataPieChart()
  {
    console.log("DATA:");
    console.log(this.pieChartData[0].data);

    let publicacionesCosasLindas:any;

    let result = await this.srvFotos.leerDBCosasLindas();

    publicacionesCosasLindas = result;
    console.log("COSAS LINDAS LEIDAS Y LISTAS:");
    console.log(publicacionesCosasLindas);

    //Limpio la data y los viejos labels del pieChart
    do {this.pieChartData[0].data.pop(); console.log("deleted");} while (this.pieChartData[0].data.length > 0);
    do {this.pieChartLabels.pop(); console.log("deleted");} while (this.pieChartLabels.length > 0);

    //Me traigo los elementos ordenados por la cantidad de likes
    let publicacionesCosasLindasMasLikeadas = publicacionesCosasLindas.sort( (a,b)=> 
    {
      if ( a.likes.length > b.likes.length) {return a} else {return b};
    });

    //Cargo los elementos al chart
    let contador = 0;
    publicacionesCosasLindasMasLikeadas.forEach(element => 
    {
      if (contador < 3)
      {
        this.pieChartData[0].data.push(element.likes.length);
        this.pieChartLabels.push(element.emisor);
        contador++;
      }
    });

    //Actualizo el pieChart
    let charts = Chart.instances;

    setTimeout( ()=>{charts[1].update();},1500)
  }

  private async cargarDataBarChart()
  {
    console.log("DATA:");
    console.log(this.barChartData[0].data);

    let publicacionesCosasFeas:any;

    let result = await this.srvFotos.leerDBCosasFeas();

    publicacionesCosasFeas = result;
    console.log("COSAS FEAS LEIDAS Y LISTAS:");
    console.log(publicacionesCosasFeas);

    //Limpio la data y los viejos labels del barChart
    do {this.barChartData[0].data.pop(); console.log("deleted");} while (this.barChartData[0].data.length > 0);
    do {this.barChartLabels.pop(); console.log("deleted");} while (this.barChartLabels.length > 0);

    //Me traigo los elementos ordenados por la cantidad de likes
    let publicacionesCosasFeasMasLikeadas = publicacionesCosasFeas.sort( (a,b)=> 
    {
      if ( a.likes.length > b.likes.length) {return a} else {return b};
    });

    //Cargo los elementos al chart
    let contador = 0;
    publicacionesCosasFeasMasLikeadas.forEach(element => 
    {
      if (contador < 3)
      {
        this.barChartData[0].data.push(element.likes.length);
        this.barChartLabels.push(element.emisor);
        contador++;
      }
    });

    this.barChartData[0].label = "Las cosas más feas";

    //Actualizo el barChart
    let charts = Chart.instances;

    setTimeout( ()=>{charts[0].update();},1500)
    
  }

  public click(e:any)
  {
    console.log(e);
  }

  volver()
  {
    this.routerRecieved.navigate(['/loged']); 
  }
}
