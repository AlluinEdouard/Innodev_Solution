import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.scss']
})
export class ConseilComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('backgroundVideo', { static: false }) backgroundVideo?: ElementRef<HTMLVideoElement>;

  private animations: (gsap.core.Tween | gsap.core.Timeline)[] = [];
  private scrollTriggers: ScrollTrigger[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialisation du composant
  }

  ngAfterViewInit(): void {
    // Petit délai pour s'assurer que tous les éléments sont dans le DOM
    setTimeout(() => {
      this.initAnimations();
      this.addHoverAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    // Nettoyer les animations et les ScrollTriggers
    this.cleanupAnimations();
  }

  /**
   * Redémarre la vidéo de fond quand elle se termine
   */
  restartVideo(): void {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.currentTime = 0;
      this.backgroundVideo.nativeElement.play();
    }
  }

  /**
   * Initialise toutes les animations GSAP
   */
  private initAnimations(): void {
    // S'assurer que tous les éléments sont visibles par défaut
    this.resetElementsVisibility();
    
    this.animateVideoSection();
    this.animateIntroSection();
    this.animateAnalyseSection();
    this.animateStrategieSection();
    this.animateMiseOeuvreSection();
    this.animateSuiviSection();
    this.animateExpertiseSection();
  }

  /**
   * Remet tous les éléments à leur état visible par défaut
   */
  private resetElementsVisibility(): void {
    // Remettre tous les éléments animés à leur état normal
    gsap.set([
      '.analyse-features .feature-item',
      '.strategie-grid .strategie-card',
      '.mise-oeuvre-steps .step-row',
      '.suivi-card',
      '.domain-card'
    ], {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1
    });
  }

  /**
   * Animation de la section vidéo et titre principal
   */
  private animateVideoSection(): void {
    const tl = gsap.timeline();
    
    // Animation du titre principal
    tl.from('.main-title', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animation de l'overlay vidéo
    tl.from('.video-overlay', {
      duration: 1,
      opacity: 1,
      ease: 'power2.out'
    }, '-=0.5');

    this.animations.push(tl);
  }

  /**
   * Animation de la section introduction
   */
  private animateIntroSection(): void {
    const introTrigger = ScrollTrigger.create({
      trigger: '.intro-label',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation de l'icône
        tl.from('.intro-icon', {
          duration: 0.8,
          scale: 0,
          rotation: 180,
          ease: 'back.out(1.7)'
        });

        // Animation du titre
        tl.from('.intro-title', {
          duration: 0.6,
          x: -50,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.4');

        // Animation du texte
        tl.from('.intro-text', {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.3');

        this.animations.push(tl);
      }
    });

    this.scrollTriggers.push(introTrigger);
  }

  /**
   * Animation de la section analyse et diagnostic
   */
  private animateAnalyseSection(): void {
    const analyseTrigger = ScrollTrigger.create({
      trigger: '.analyse-label',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation du titre
        tl.from('.analyse-label .blue-title', {
          duration: 0.8,
          y: -30,
          opacity: 0,
          ease: 'power2.out'
        });

        // Animation de la ligne sous le titre
        tl.from('.analyse-label .title-underline', {
          duration: 0.6,
          width: 0,
          ease: 'power2.out'
        }, '-=0.3');

        // Animation de l'icône
        tl.from('.analyse-label .icon-container img', {
          duration: 0.8,
          scale: 0,
          rotation: 360,
          ease: 'back.out(1.7)'
        }, '-=0.4');

        // Animation de la description
        tl.from('.analyse-label .blue-description', {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.3');

        // Animation des features - CORRECTION ICI
        tl.fromTo('.analyse-features .feature-item', 
          {
            y: 50,
            opacity: 0
          },
          {
            duration: 0.6,
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'power2.out'
          }, '-=0.2');

        this.animations.push(tl);
      }
    });

    this.scrollTriggers.push(analyseTrigger);
  }

  /**
   * Animation de la section stratégie personnalisée
   */
  private animateStrategieSection(): void {
    const strategieTrigger = ScrollTrigger.create({
      trigger: '.strategie-label',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation du titre
        tl.from('.strategie-title', {
          duration: 0.8,
          y: -30,
          opacity: 0,
          ease: 'power2.out'
        });

        // Animation de la description
        tl.from('.strategie-description', {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.4');

        // Animation des cartes stratégie - CORRECTION ICI
        tl.fromTo('.strategie-grid .strategie-card',
          {
            y: 60,
            opacity: 0
          },
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'back.out(1.2)'
          }, '-=0.3');

        // Animation des icônes dans les cartes
        tl.fromTo('.strategie-grid .strategie-card .strategie-icon',
          {
            scale: 0,
            rotation: 180
          },
          {
            duration: 0.6,
            scale: 1,
            rotation: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)'
          }, '-=0.6');

        this.animations.push(tl);
      }
    });

    this.scrollTriggers.push(strategieTrigger);
  }

  /**
   * Animation de la section mise en œuvre guidée
   */
  private animateMiseOeuvreSection(): void {
    const miseOeuvreTrigger = ScrollTrigger.create({
      trigger: '.mise-oeuvre-label',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation du titre
        tl.from('.mise-oeuvre-label .blue-title', {
          duration: 0.8,
          y: -30,
          opacity: 0,
          ease: 'power2.out'
        });

        // Animation de la ligne sous le titre
        tl.from('.mise-oeuvre-label .title-underline', {
          duration: 0.6,
          width: 0,
          ease: 'power2.out'
        }, '-=0.3');

        // Animation de l'introduction
        tl.from('.mise-oeuvre-intro', {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.4');

        // Animation des étapes - CORRECTION ICI
        tl.fromTo('.mise-oeuvre-steps .step-row:nth-child(odd)',
          {
            x: -100,
            opacity: 0
          },
          {
            duration: 0.8,
            x: 0,
            opacity: 1,
            stagger: 0.3,
            ease: 'power2.out'
          }, '-=0.3');

        tl.fromTo('.mise-oeuvre-steps .step-row:nth-child(even)',
          {
            x: 100,
            opacity: 0
          },
          {
            duration: 0.8,
            x: 0,
            opacity: 1,
            stagger: 0.3,
            ease: 'power2.out'
          }, '-=1.1');

        // Animation des numéros d'étapes
        tl.fromTo('.mise-oeuvre-steps .step-number',
          {
            scale: 0,
            rotation: 360
          },
          {
            duration: 0.6,
            scale: 1,
            rotation: 0,
            stagger: 0.3,
            ease: 'back.out(1.7)'
          }, '-=1.4');

        this.animations.push(tl);
      }
    });

    this.scrollTriggers.push(miseOeuvreTrigger);
  }

  /**
   * Animation de la section suivi et optimisation
   */
  private animateSuiviSection(): void {
    const suiviTrigger = ScrollTrigger.create({
      trigger: '.suivi-label',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation du titre
        tl.from('.suivi-title', {
          duration: 0.8,
          y: -30,
          opacity: 0,
          ease: 'power2.out'
        });

        // Animation de la description
        tl.from('.suivi-description', {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.4');

        // Animation des cartes suivi - CORRECTION ICI
        tl.fromTo('.suivi-card',
          {
            y: 50,
            opacity: 0
          },
          {
            duration: 0.7,
            y: 0,
            opacity: 1,
            stagger: {
              amount: 1,
              from: 'start',
              ease: 'power2.out'
            },
            ease: 'back.out(1.2)'
          }, '-=0.3');

        // Animation des icônes emoji
        tl.fromTo('.suivi-icon',
          {
            scale: 0,
            rotation: 180
          },
          {
            duration: 0.5,
            scale: 1,
            rotation: 0,
            stagger: {
              amount: 0.8,
              from: 'start'
            },
            ease: 'back.out(1.7)'
          }, '-=0.8');

        this.animations.push(tl);
      }
    });

    this.scrollTriggers.push(suiviTrigger);
  }

  /**
   * Animation de la section expertise métier
   */
  private animateExpertiseSection(): void {
    const expertiseTrigger = ScrollTrigger.create({
      trigger: '.expertise-label',
      start: 'top 85%',
      end: 'bottom 15%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Animation du titre
        tl.from('.expertise-label .blue-title', {
          duration: 0.8,
          y: -30,
          opacity: 0,
          ease: 'power2.out'
        });

        // Animation de la ligne sous le titre
        tl.from('.expertise-label .title-underline', {
          duration: 0.6,
          width: 0,
          ease: 'power2.out'
        }, '-=0.3');

        // Animation de l'introduction
        tl.from('.expertise-intro', {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        }, '-=0.4');

        // Animation des domaines d'expertise
        tl.fromTo('.domain-card',
          {
            y: 60,
            opacity: 0
          },
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: 'back.out(1.2)'
          }, '-=0.3');

        // Animation des icônes dans les en-têtes
        tl.fromTo('.domain-header img',
          {
            scale: 0,
            rotation: 360
          },
          {
            duration: 0.6,
            scale: 1,
            rotation: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
          }, '-=0.8');

        this.animations.push(tl);
      }
    });

    this.scrollTriggers.push(expertiseTrigger);
  }

  /**
   * Ajoute des animations de hover sur les éléments interactifs
   */
  private addHoverAnimations(): void {
    // Animation hover pour les feature-items
    document.querySelectorAll('.feature-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          duration: 0.3,
          y: -10,
          scale: 1.02,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: 'power2.out'
        });
      });
    });

    // Animation hover pour les cartes stratégie
    document.querySelectorAll('.strategie-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          y: -15,
          scale: 1.03,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: 'power2.out'
        });
      });
    });

    // Animation hover pour les cartes suivi
    document.querySelectorAll('.suivi-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          y: -8,
          scale: 1.02,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: 'power2.out'
        });
      });
    });

    // Animation hover pour les domain-cards
    document.querySelectorAll('.domain-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.3,
          y: -12,
          scale: 1.03,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: 'power2.out'
        });
      });
    });
  }

  /**
   * Nettoie toutes les animations et ScrollTriggers
   */
  private cleanupAnimations(): void {
    // Tuer toutes les animations
    this.animations.forEach(animation => {
      if (animation) {
        animation.kill();
      }
    });

    // Tuer tous les ScrollTriggers
    this.scrollTriggers.forEach(trigger => {
      if (trigger) {
        trigger.kill();
      }
    });

    // Nettoyer les tableaux
    this.animations = [];
    this.scrollTriggers = [];

    // Nettoyer tous les ScrollTriggers restants
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}