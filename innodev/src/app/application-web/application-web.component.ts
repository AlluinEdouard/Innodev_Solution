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

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le titre principal
    this.animateMainTitle();
    
    // Animation pour les labels
    this.animateLabels();
    
    // Animation pour les éléments spécifiques
    this.animateIntroSection();
    this.animateConceptionFeatures();
    this.animateSolutionCards();
    this.animateStrategyRows();
    this.animateEngagementCards();
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
          delay: index * 0.2,
          scrollTrigger: {
            trigger: label,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  // Animation de la section d'introduction
  private animateIntroSection(): void {
    const introIcon = document.querySelector('.intro-icon');
    const introTitle = document.querySelector('.intro-title');
    const introText = document.querySelector('.intro-text');

    if (introIcon) {
      gsap.fromTo(introIcon,
        {
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: introIcon,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (introTitle) {
      gsap.fromTo(introTitle,
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introTitle,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (introText) {
      gsap.fromTo(introText,
        {
          x: -30,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introText,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }

  // Animation des features de conception
  private animateConceptionFeatures(): void {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  // Animation des cartes de solutions
  private animateSolutionCards(): void {
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 80,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation de l'icône au survol
      const icon = card.querySelector('.solution-icon');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            rotation: 360,
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      }
    });
  }

  // Animation des rangées de stratégie
  private animateStrategyRows(): void {
    const strategyRows = document.querySelectorAll('.strategy-row');
    
    strategyRows.forEach((row, index) => {
      const isEven = index % 2 === 0;
      
      gsap.fromTo(row,
        {
          x: isEven ? -100 : 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation de l'icône
      const visual = row.querySelector('.strategy-visual');
      if (visual) {
        gsap.fromTo(visual,
          {
            scale: 0,
            rotation: -180
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: (index * 0.3) + 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }

  // Animation des cartes d'engagement
  private animateEngagementCards(): void {
    const engagementCards = document.querySelectorAll('.engagement-card');
    
    engagementCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation de l'icône au survol
      const icon = card.querySelector('.engagement-icon');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: 15,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

      // Animation de survol de la carte
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          x: 10,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
}