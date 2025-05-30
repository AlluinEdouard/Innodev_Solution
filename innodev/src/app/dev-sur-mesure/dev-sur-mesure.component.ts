import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-dev-sur-mesure',
  templateUrl: './dev-sur-mesure.component.html',
  styleUrls: ['./dev-sur-mesure.component.scss']
})
export class DevSurMesureComponent implements OnInit, AfterViewInit {
  videoSource: string = 'assets/dev-sur-mesure-video.mp4';
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // S'assurer que la vidéo est bien muette au chargement
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true;

      // Ajout d'un listener pour l'événement "ended" comme backup
      video.addEventListener('ended', () => {
        this.restartVideo();
      });
    }

    // Initialiser les animations GSAP après le rendu du DOM
    this.initAnimations();
  }

  // Fonction pour redémarrer la vidéo quand elle se termine
  restartVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      video.play();
    }
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le titre principal
    this.animateMainTitle();
    
    // Animation pour le contenu principal avec zigzag
    this.animateZigzagContent();
    
    // Animation pour les flèches
    this.animateArrows();
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

  // Animation du contenu en zigzag
  private animateZigzagContent(): void {
    const leftElements = document.querySelectorAll('.content-item.left');
    const rightElements = document.querySelectorAll('.content-item.right');
    
    // Animation des éléments à gauche (viennent de la gauche)
    leftElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          x: -150,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.4,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol pour les éléments à gauche
      this.addHoverAnimation(element);
    });

    // Animation des éléments à droite (viennent de la droite)
    rightElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          x: 150,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.4,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol pour les éléments à droite
      this.addHoverAnimation(element);
    });
  }

  // Animation des flèches
  private animateArrows(): void {
    const arrows = document.querySelectorAll('.arrow');
    
    arrows.forEach((arrow, index) => {
      gsap.fromTo(arrow,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 0.7,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.6 + 0.8,
          scrollTrigger: {
            trigger: arrow,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol des flèches
      arrow.addEventListener('mouseenter', () => {
        gsap.to(arrow, {
          scale: 1.1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      arrow.addEventListener('mouseleave', () => {
        gsap.to(arrow, {
          scale: 1,
          opacity: 0.7,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  // Fonction pour ajouter l'animation au survol
  private addHoverAnimation(element: Element): void {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }
}