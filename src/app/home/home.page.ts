import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonBadge, IonInfiniteScroll } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize, map } from 'rxjs';
import { MovieResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScroll,IonInfiniteScrollContent, IonBadge, IonLabel, IonAlert,
    IonSkeletonText, IonAvatar, IonItem,
    IonList, IonHeader, IonToolbar, IonTitle,
    IonContent,DatePipe,RouterModule],
})
export class HomePage {
  currentPage = 1;
  movieService = inject(MovieService);
  error = null;
  isLoading = false;
  movies:MovieResult[] = [];
  imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(5);

  constructor() {
    this.loadMovies();
  }

  loadMovies(event?:InfiniteScrollCustomEvent){
    this.error = null;
    if(!event){
      this.isLoading = true;
    }
    this.movieService.getTopRatedMovies(this.currentPage)
    .pipe(
      finalize(()=>{
        this.isLoading = false;
        if(event){
          event.target.complete();
        }
      }),
      catchError((err:any)=>{
        console.log(err);
        this.error = err.error.status_message;
        return [];
      }),
    )
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.movies.push(...res.results);
        if(event){
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }


    });
  }

  loadMore(event:InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
}
/*
this.movieService.getMovieDetails('365177').subscribe((movies)=>{
      console.log(movies);
    });
*/
