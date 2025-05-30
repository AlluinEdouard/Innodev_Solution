import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-application-web',
  imports: [CommonModule],
  templateUrl: './application-web.component.html',
  styleUrl: './application-web.component.scss'
})
export class ApplicationWebComponent implements OnInit, AfterViewInit {
  @ViewChild('backgroundVideo', { static: false}) backgroundVideo!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialisation si nécessaire
  }

  ngAfterViewInit(): void {
    // S'assurer que la vidéo est bien muette au chargement
    if (this.backgroundVideo && this.backgroundVideo.nativeElement) {
      const video = this.backgroundVideo.nativeElement;
      video.muted = true;

      // Ajout d'un listener pour l'événement "ended" comme backup
      video.addEventListener('ended', () => {
        this.restartVideo();
      });
    }

    // Initialiser les animations GSAP après le rendu du DOM
    this.initAnimations();
  }

  restartVideo() {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.currentTime = 0;
      this.backgroundVideo.nativeElement.play();
    }
  }

  // Fonction pour le bouton "Voir les réalisations" - Navigation vers la page réalisations
  onVoirRealisations() {
    // Navigation vers la page réalisations
    this.router.navigate(['/realisations']);
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le titre principal
    this.animateMainTitle();
    
    // Animation pour les labels
    this.animateLabels();
    
    // Animation pour le bouton
    this.animateButton();
  }

  // Animation du titre principal
  private animateMainTitle(): void {
    const mainTitle = document.querySelector('.main-title');
    
    if (mainTitle) {
      gsap.fromTo(mainTitle, 
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainTitle,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }

  // Animation des labels
  private animateLabels(): void {
    const labels = document.querySelectorAll('.content-label');
    
    labels.forEach((label, index) => {
      gsap.fromTo(label,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: label,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  // Animation du bouton
  private animateButton(): void {
    const button = document.querySelector('.cta-button');
    
    if (button) {
      gsap.fromTo(button,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: button,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  }
}