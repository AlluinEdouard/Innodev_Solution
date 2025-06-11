import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

@Component({
  selector: 'app-automatisations',
  templateUrl: './automatisations.component.html',
  styleUrls: ['./automatisations.component.scss']
})
export class AutomatisationsComponent implements OnInit, OnDestroy, AfterViewInit {
  
  @ViewChild('backgroundVideo', { static: false }) backgroundVideo!: ElementRef<HTMLVideoElement>;

  private timeline: gsap.core.Timeline | null = null;
  private scrollTriggers: ScrollTrigger[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialisation du composant
    this.initializeVideoPlayback();
  }

  ngAfterViewInit(): void {
    // Initialiser les animations après que la vue soit complètement chargée
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    // Nettoyage lors de la destruction du composant
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.pause();
      this.backgroundVideo.nativeElement.currentTime = 0;
    }
    
    // Nettoyer les animations GSAP
    this.cleanupAnimations();
  }

  /**
   * Redémarre la vidéo en boucle lorsqu'elle se termine
   */
  restartVideo(): void {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.currentTime = 0;
      this.backgroundVideo.nativeElement.play().catch(error => {
        console.warn('Erreur lors de la lecture automatique de la vidéo:', error);
      });
    }
  }

  /**
   * Initialise toutes les animations GSAP
   */
  private initializeAnimations(): void {
    this.animateHeroSection();
    this.animateContentLabels();
    this.animateFeatureItems();
    this.animateDevelopmentCards();
    this.animateProductivityStrategies();
    this.animateEvolutionCards();
  }

  /**
   * Animation de la section héro avec titre
   */
  private animateHeroSection(): void {
    // Animation du titre principal
    gsap.fromTo('.main-title', 
      {
        opacity: 0,
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.5
      }
    );

    // Animation de l'overlay vidéo
    gsap.fromTo('.video-overlay',
      {
        opacity: 0.8
      },
      {
        opacity: 0.4,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      }
    );
  }

  /**
   * Animation des labels de contenu au scroll
   */
  private animateContentLabels(): void {
    const labels = gsap.utils.toArray('.content-label');
    
    labels.forEach((label: any, index: number) => {
      const isWhiteLabel = label.classList.contains('white-label');
      
      const trigger = ScrollTrigger.create({
        trigger: label,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.fromTo(label,
            {
              opacity: 0,
              y: isWhiteLabel ? -50 : 50,
              rotationX: isWhiteLabel ? -15 : 15
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1,
              ease: 'power3.out',
              delay: index * 0.1
            }
          );
        }
      });
      
      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Animation des éléments de fonctionnalités
   */
  private animateFeatureItems(): void {
    const featureItems = gsap.utils.toArray('.feature-item');
    
    featureItems.forEach((item: any, index: number) => {
      const trigger = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(item,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              rotation: index % 2 === 0 ? -5 : 5
            },
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              delay: index * 0.15
            }
          );

          // Animation de l'icône avec effet de rebond
          const icon = item.querySelector('.feature-icon img');
          if (icon) {
            gsap.fromTo(icon,
              {
                scale: 0,
                rotation: 180
              },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                delay: (index * 0.15) + 0.3
              }
            );
          }
        }
      });
      
      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Animation des cartes de développement
   */
  private animateDevelopmentCards(): void {
    const cards = gsap.utils.toArray('.development-card');
    
    const trigger = ScrollTrigger.create({
      trigger: '.development-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: {
              amount: 0.6,
              from: 'start'
            }
          }
        );

        // Animation des icônes avec rotation
        cards.forEach((card: any, index: number) => {
          const icon = card.querySelector('.development-icon img');
          if (icon) {
            gsap.fromTo(icon,
              {
                rotation: -360,
                scale: 0
              },
              {
                rotation: 0,
                scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.6)',
                delay: index * 0.2 + 0.4
              }
            );
          }
        });
      }
    });
    
    this.scrollTriggers.push(trigger);
  }

  /**
   * Animation des stratégies de productivité
   */
  private animateProductivityStrategies(): void {
    const strategies = gsap.utils.toArray('.strategy-row');
    
    strategies.forEach((strategy: any, index: number) => {
      const trigger = ScrollTrigger.create({
        trigger: strategy,
        start: 'top 85%',
        onEnter: () => {
          const visual = strategy.querySelector('.strategy-visual');
          const content = strategy.querySelector('.strategy-content');
          
          // Animation du visuel
          gsap.fromTo(visual,
            {
              opacity: 0,
              x: -100,
              rotation: -45
            },
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.8,
              ease: 'power3.out'
            }
          );
          
          // Animation du contenu
          gsap.fromTo(content,
            {
              opacity: 0,
              x: 100
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2
            }
          );

          // Animation de l'icône avec pulsation
          const icon = visual.querySelector('img');
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              duration: 1,
              ease: 'power2.inOut',
              yoyo: true,
              repeat: -1,
              delay: 0.5
            });
          }
        }
      });
      
      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Animation des cartes d'évolution
   */
  private animateEvolutionCards(): void {
    const cards = gsap.utils.toArray('.evolution-card');
    
    const trigger = ScrollTrigger.create({
      trigger: '.evolution-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 50,
            rotationY: 90
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: {
              amount: 1.2,
              grid: [2, 3],
              from: 'center'
            }
          }
        );

        // Animation des emojis avec rebond
        cards.forEach((card: any, index: number) => {
          const emoji = card.querySelector('.evolution-icon');
          if (emoji) {
            gsap.fromTo(emoji,
              {
                scale: 0,
                rotation: 180
              },
              {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'bounce.out',
                delay: index * 0.1 + 0.5
              }
            );
          }
        });
      }
    });
    
    this.scrollTriggers.push(trigger);
  }

  /**
   * Animation des titres avec effet de frappe
   */
  private animateTitleTypewriter(selector: string, delay: number = 0): void {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.textContent || '';
      element.textContent = '';
      
      gsap.to(element, {
        text: text,
        duration: text.length * 0.05,
        ease: 'none',
        delay: delay
      });
    }
  }

  /**
   * Ajoute des effets de hover sur les éléments interactifs
   */
  private addHoverAnimations(): void {
    // Hover sur les cartes de développement
    const devCards = gsap.utils.toArray('.development-card');
    devCards.forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Hover sur les cartes d'évolution
    const evolutionCards = gsap.utils.toArray('.evolution-card');
    evolutionCards.forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.08,
          rotationY: 5,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Nettoie toutes les animations et ScrollTriggers
   */
  private cleanupAnimations(): void {
    // Tuer tous les ScrollTriggers
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];
    
    // Tuer la timeline principale si elle existe
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
    
    // Nettoyer tous les ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Tuer toutes les animations GSAP
    gsap.killTweensOf('*');
  }

  /**
   * Initialise la lecture de la vidéo de fond
   */
  private initializeVideoPlayback(): void {
    setTimeout(() => {
      if (this.backgroundVideo?.nativeElement) {
        const video = this.backgroundVideo.nativeElement;
        
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        video.play().catch(error => {
          console.warn('La lecture automatique de la vidéo a été bloquée:', error);
        });

        video.addEventListener('loadeddata', () => {
          console.log('Vidéo chargée avec succès');
          // Lancer les animations après le chargement de la vidéo
          setTimeout(() => {
            this.addHoverAnimations();
          }, 500);
        });

        video.addEventListener('error', (error) => {
          console.error('Erreur lors du chargement de la vidéo:', error);
        });
      }
    }, 100);
  }

  /**
   * Gère les erreurs de chargement de la vidéo
   */
  onVideoError(event: Event): void {
    console.error('Erreur de lecture vidéo:', event);
  }

  /**
   * Appelée lorsque la vidéo est prête à être lue
   */
  onVideoCanPlay(): void {
    console.log('La vidéo est prête à être lue');
  }

  /**
   * Méthode pour forcer la lecture de la vidéo
   */
  playVideo(): void {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.play().catch(error => {
        console.error('Impossible de démarrer la vidéo:', error);
      });
    }
  }

  /**
   * Méthode pour mettre en pause la vidéo
   */
  pauseVideo(): void {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.pause();
    }
  }
}