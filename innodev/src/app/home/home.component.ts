import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  videoSource: string = 'assets/background-video-home.mp4';
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  
  // Objet pour suivre l'état d'expansion de chaque section
  expandedSections: { [key: string]: boolean } = {
    uxui: false,
    languages: false,
    logiciels: false,
    coordination: false
  };

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
  
  // Fonction pour afficher/masquer le texte complet
  toggleText(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le content-overlay (apparition depuis la gauche, se répète à chaque survol)
    this.animateContentOverlay();
    
    // Animation pour le content-section (apparition depuis le bas)
    this.animateContentSection();
    
    // Animations pour les expertise-items
    this.animateExpertiseItems();
    
    // Animation pour la section CTA (apparition depuis la gauche)
    this.animateCtaSection();
  }

  // Animation du content-overlay avec répétition au survol
  private animateContentOverlay(): void {
    const contentOverlay = document.querySelector('.content-overlay');
    
    if (contentOverlay) {
      // Animation initiale
      gsap.fromTo(contentOverlay, 
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentOverlay,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol (mouseenter/mouseleave)
      contentOverlay.addEventListener('mouseenter', () => {
        gsap.fromTo(contentOverlay,
          {
            x: -50,
            opacity: 0.8
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      });
    }
  }

  // Animation du content-section depuis le bas
  private animateContentSection(): void {
    const contentSection = document.querySelector('.content-section');
    
    if (contentSection) {
      gsap.fromTo(contentSection,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentSection,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      contentSection.addEventListener('mouseenter', () => {
        gsap.fromTo(contentSection,
          {
            y: 30,
            opacity: 0.9
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      });
    }
  }

  // Animations des expertise-items
  private animateExpertiseItems(): void {
    // Items normaux (depuis la gauche)
    const normalItems = document.querySelectorAll('.expertise-item:not(.mirror)');
    
    normalItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      item.addEventListener('mouseenter', () => {
        gsap.fromTo(item,
          {
            x: -30,
            opacity: 0.9
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        );
      });
    });

    // Items mirror (depuis la droite)
    const mirrorItems = document.querySelectorAll('.expertise-item.mirror');
    
    mirrorItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      item.addEventListener('mouseenter', () => {
        gsap.fromTo(item,
          {
            x: 30,
            opacity: 0.9
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        );
      });
    });
  }

  // Animation de la section CTA depuis la gauche
  private animateCtaSection(): void {
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
      gsap.fromTo(ctaSection,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      ctaSection.addEventListener('mouseenter', () => {
        gsap.fromTo(ctaSection,
          {
            x: -50,
            opacity: 0.9
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      });
    }
  }
}