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

    // Attendre un petit délai pour s'assurer que le DOM est complètement rendu
    setTimeout(() => {
      this.initAnimations();
    }, 100);
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
    
    // Animation pour l'introduction
    this.animateIntroSection();
    
    // Animation pour les cartes de services
    this.animateServiceCards();
    
    // Animation pour les statistiques
    this.animateStats();
    
    // Animation pour la section processus
    this.animateProcessSection();
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

  // Animation de l'introduction
  private animateIntroSection(): void {
    const introTitle = document.querySelector('.intro-title');
    const introDescription = document.querySelector('.intro-description');
    const introBadge = document.querySelector('.intro-badge');

    // Animation du badge
    if (introBadge) {
      gsap.fromTo(introBadge,
        {
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: introBadge,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation du titre
    if (introTitle) {
      gsap.fromTo(introTitle,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: introTitle,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation de la description
    if (introDescription) {
      gsap.fromTo(introDescription,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: introDescription,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }

  // Animation des cartes de services
  private animateServiceCards(): void {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
      // Animation d'entrée
      gsap.fromTo(card,
        {
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animations au survol
      this.addServiceCardHoverAnimation(card);
    });
  }

  // Animation des statistiques
  private animateStats(): void {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach((stat, index) => {
      const number = stat.querySelector('.stat-number');
      const label = stat.querySelector('.stat-label');
      
      // Animation du conteneur
      gsap.fromTo(stat,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation du nombre (compteur)
      if (number) {
        const finalValue = parseInt(number.textContent || '0');
        gsap.fromTo({ value: 0 },
          { value: finalValue },
          {
            duration: 2,
            ease: "power2.out",
            delay: index * 0.15 + 0.5,
            onUpdate: function() {
              number.textContent = Math.round(this['targets']()[0].value).toString();
            },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }

  // Animation de la section processus
  private animateProcessSection(): void {
    const processTitle = document.querySelector('.process-title');
    const processSteps = document.querySelectorAll('.process-step');
    
    // Animation du titre
    if (processTitle) {
      gsap.fromTo(processTitle,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: processTitle,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation des étapes
    processSteps.forEach((step, index) => {
      const stepNumber = step.querySelector('.step-number');
      const stepContent = step.querySelector('.step-content');
      const stepConnector = step.querySelector('.step-connector');
      
      // Animation du numéro
      if (stepNumber) {
        gsap.fromTo(stepNumber,
          {
            scale: 0,
            opacity: 0,
            rotation: -180
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.3,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animation du contenu
      if (stepContent) {
        gsap.fromTo(stepContent,
          {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.3 + 0.4,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animation du connecteur
      if (stepConnector) {
        gsap.fromTo(stepConnector,
          {
            scaleX: 0,
            opacity: 0
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.3 + 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }

  // Animations au survol pour les cartes de services
  private addServiceCardHoverAnimation(card: Element): void {
    const icon = card.querySelector('.service-icon');
    const title = card.querySelector('.service-title');
    const badge = card.querySelector('.service-badge');

    card.addEventListener('mouseenter', () => {
      // Animation de la carte
      gsap.to(card, {
        y: -15,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animation de l'icône
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 10,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      // Animation du titre
      if (title) {
        gsap.to(title, {
          color: "#4BA4CE",
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Animation du badge
      if (badge) {
        gsap.to(badge, {
          scale: 1.1,
          backgroundColor: "#4BA4CE",
          color: "white",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      // Retour à l'état normal
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      if (title) {
        gsap.to(title, {
          color: "#25384A",
          duration: 0.3,
          ease: "power2.out"
        });
      }

      if (badge) {
        gsap.to(badge, {
          scale: 1,
          backgroundColor: "rgba(75, 164, 206, 0.1)",
          color: "#4BA4CE",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  }

  // Animation de parallaxe pour les éléments flottants
  private initParallaxElements(): void {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        rotation: "random(-5, 5)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });
  }

  // Animation continue pour les éléments de décoration
  private initContinuousAnimations(): void {
    // Animation des particules flottantes
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
      gsap.set(particle, { 
        x: "random(-100, 100)", 
        y: "random(-100, 100)",
        opacity: "random(0.3, 0.8)"
      });
      
      gsap.to(particle, {
        x: "+=random(-50, 50)",
        y: "+=random(-50, 50)",
        rotation: "+=random(-180, 180)",
        duration: "random(8, 15)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });
  }
}