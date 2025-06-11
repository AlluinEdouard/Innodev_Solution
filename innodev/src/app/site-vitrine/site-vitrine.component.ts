import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-site-vitrine',
  imports: [CommonModule],
  templateUrl: './site-vitrine.component.html',
  styleUrl: './site-vitrine.component.scss'
})
export class SiteVitrineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('backgroundVideo', { static: false}) backgroundVideo!: ElementRef<HTMLVideoElement>;

  // Données pour les sections de contenu
  contentSections = [
    {
      id: 'identite',
      icon: 'assets/identity-icon.svg',
      title: 'Identité Sur Mesure',
      subtitle: 'Refléter votre unicité',
      description: 'Chaque site internet que nous créons est unique et pensé spécialement pour votre entreprise. Nous analysons votre identité, vos valeurs et vos objectifs pour concevoir une plateforme qui vous ressemble vraiment.',
      features: [
        'Analyse approfondie de votre marque',
        'Design personnalisé et exclusif',
        'Cohérence avec votre identité visuelle',
        'Adaptation à votre secteur d\'activité'
      ],
      stats: {
        number: '100%',
        label: 'Personnalisé'
      }
    },
    {
      id: 'performance',
      icon: 'assets/performance-icon.svg',
      title: 'Performance Optimale',
      subtitle: 'Des plateformes qui performent',
      description: 'Nous développons des sites internet haute performance, optimisés pour la vitesse et la fluidité. Nos plateformes sont conçues avec les dernières technologies pour garantir une expérience utilisateur exceptionnelle.',
      features: [
        'Temps de chargement ultra-rapides',
        'Optimisation technique avancée',
        'Architecture robuste et évolutive',
        'Compatibilité multi-navigateurs'
      ],
      stats: {
        number: '<2s',
        label: 'Temps de chargement'
      }
    },
    {
      id: 'experience',
      icon: 'assets/ux-icon.svg',
      title: 'Expérience Utilisateur',
      subtitle: 'Fluidité et intuitivité',
      description: 'L\'expérience utilisateur est au cœur de notre approche. Nous concevons des interfaces intuitives et engageantes qui guident naturellement vos visiteurs vers l\'action souhaitée.',
      features: [
        'Navigation intuitive et claire',
        'Design responsive adaptatif',
        'Parcours utilisateur optimisé',
        'Interactions fluides et naturelles'
      ],
      stats: {
        number: '+85%',
        label: 'Taux d\'engagement'
      }
    },
    {
      id: 'croissance',
      icon: 'assets/growth-icon.svg',
      title: 'Croissance en Ligne',
      subtitle: 'Favoriser votre développement',
      description: 'Nos solutions accompagnent votre croissance avec des fonctionnalités évolutives, une optimisation SEO avancée et des outils d\'analyse pour mesurer et améliorer vos performances.',
      features: [
        'Optimisation SEO intégrée',
        'Outils d\'analyse et de suivi',
        'Fonctionnalités évolutives',
        'Support technique continu'
      ],
      stats: {
        number: '+150%',
        label: 'Visibilité en ligne'
      }
    }
  ];

  // Données pour les technologies
  technologies = [
    { name: 'HTML5', icon: 'assets/tech-html.png', category: 'Frontend' },
    { name: 'CSS3', icon: 'assets/tech-css.png', category: 'Frontend' },
    { name: 'JavaScript', icon: 'assets/tech-js.png', category: 'Frontend' },
    { name: 'TypeScript', icon: 'assets/tech-ts.png', category: 'Frontend' },
    { name: 'Angular', icon: 'assets/tech-angular.png', category: 'Framework' },
    { name: 'React', icon: 'assets/tech-react.png', category: 'Framework' },
    { name: 'Vue.js', icon: 'assets/tech-vue.png', category: 'Framework' },
    { name: 'Node.js', icon: 'assets/tech-node.png', category: 'Backend' },
    { name: 'MongoDB', icon: 'assets/tech-mongo.png', category: 'Database' },
    { name: 'PostgreSQL', icon: 'assets/tech-postgres.png', category: 'Database' }
  ];

  // Données pour les témoignages/cas d'usage
  testimonials = [
    {
      company: 'TechStart',
      industry: 'Startup Technologique',
      result: '+300% de conversions',
      quote: 'Notre nouveau site a transformé notre présence en ligne',
      image: 'assets/testimonial-1.jpg'
    },
    {
      company: 'Artisan Local',
      industry: 'Artisanat',
      result: '+200% de visibilité',
      quote: 'Enfin un site qui représente notre savoir-faire',
      image: 'assets/testimonial-2.jpg'
    },
    {
      company: 'E-Commerce',
      industry: 'Commerce en ligne',
      result: '+180% de ventes',
      quote: 'Des performances exceptionnelles dès le lancement',
      image: 'assets/testimonial-3.jpg'
    }
  ];

  // Variables pour les animations
  private animationTimeline: gsap.core.Timeline | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  ngOnInit() {
    // Initialisation des observateurs pour les animations
    this.initIntersectionObserver();
  }

  ngAfterViewInit(): void {
    // Configuration de la vidéo background
    this.setupBackgroundVideo();
    
    // Initialiser les animations après le rendu du DOM
    setTimeout(() => {
      this.initAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    // Nettoyage des animations et observateurs
    if (this.animationTimeline) {
      this.animationTimeline.kill();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // Configuration de la vidéo background
  private setupBackgroundVideo(): void {
    if (this.backgroundVideo && this.backgroundVideo.nativeElement) {
      const video = this.backgroundVideo.nativeElement;
      video.muted = true;
      video.playsInline = true;

      // Gestion des événements vidéo
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log('Autoplay prevented:', e));
      });

      video.addEventListener('ended', () => {
        this.restartVideo();
      });

      // Gestion des erreurs
      video.addEventListener('error', (e) => {
        console.warn('Video error:', e);
      });
    }
  }

  restartVideo(): void {
    if (this.backgroundVideo?.nativeElement) {
      const video = this.backgroundVideo.nativeElement;
      video.currentTime = 0;
      video.play().catch(e => console.log('Video restart failed:', e));
    }
  }

  // Intersection Observer pour les animations lazy
  private initIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observer les éléments après le rendu
    setTimeout(() => {
      const elementsToObserve = document.querySelectorAll('.animate-on-scroll');
      elementsToObserve.forEach(el => {
        if (this.intersectionObserver) {
          this.intersectionObserver.observe(el);
        }
      });
    }, 500);
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation du titre principal
    this.animateHeroTitle();
    
    // Animation des sections de contenu
    this.animateContentSections();
    
    // Animation des statistiques
    this.animateStats();
    
    // Animation des technologies
    this.animateTechnologies();
    
    // Animation des témoignages
    this.animateTestimonials();
  }

  // Animation du titre principal
  private animateHeroTitle(): void {
    const title = document.querySelector('.main-title');
    
    if (title) {
      gsap.fromTo(title,
        {
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }

  // Animation des sections de contenu
  private animateContentSections(): void {
    this.contentSections.forEach((section, index) => {
      const sectionElement = document.querySelector(`#section-${section.id}`);
      
      if (sectionElement) {
        // Animation d'entrée de la section
        gsap.fromTo(sectionElement,
          {
            y: 80,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionElement,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animation des icônes
        const icon = sectionElement.querySelector('.section-icon');
        if (icon) {
          gsap.fromTo(icon,
            {
              scale: 0,
              rotation: -90,
              opacity: 0
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: 0.3,
              scrollTrigger: {
                trigger: sectionElement,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Animation des features
        const features = sectionElement.querySelectorAll('.feature-item');
        features.forEach((feature, featureIndex) => {
          gsap.fromTo(feature,
            {
              x: -30,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.5 + (featureIndex * 0.1),
              scrollTrigger: {
                trigger: sectionElement,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Animation au survol
        this.addSectionHoverEffects(sectionElement);
      }
    });
  }

  // Animation des statistiques
  private animateStats(): void {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
      const value = stat.textContent || '0';
      const numericValue = parseInt(value.replace(/[^\d]/g, ''));
      
      if (numericValue > 0) {
        gsap.fromTo(stat,
          { 
            innerHTML: "0" 
          },
          {
            innerHTML: value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            snap: { innerHTML: 1 }
          }
        );
      }
    });
  }

  // Animation des technologies
  private animateTechnologies(): void {
    const techGrid = document.querySelector('.tech-grid');
    
    if (techGrid) {
      const techItems = techGrid.querySelectorAll('.tech-item');
      
      // Animation en cascade
      gsap.fromTo(techItems,
        {
          scale: 0,
          opacity: 0,
          y: 30
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: techGrid,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Effet de hover avancé
      techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.1,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  }

  // Animation des témoignages
  private animateTestimonials(): void {
    const testimonialSection = document.querySelector('.testimonials-section');
    
    if (testimonialSection) {
      const testimonials = testimonialSection.querySelectorAll('.testimonial-card');
      
      testimonials.forEach((card, index) => {
        gsap.fromTo(card,
          {
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
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
      });
    }
  }

  // Effets de survol pour les sections
  private addSectionHoverEffects(section: Element): void {
    section.addEventListener('mouseenter', () => {
      gsap.to(section, {
        scale: 1.02,
        y: -5,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    section.addEventListener('mouseleave', () => {
      gsap.to(section, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  }

  // Méthodes utilitaires pour les interactions
  onSectionClick(sectionId: string): void {
    const section = document.getElementById(`section-${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Méthode pour filtrer les technologies par catégorie
  getTechnologiesByCategory(category: string) {
    return this.technologies.filter(tech => tech.category === category);
  }

  // Méthode pour obtenir les statistiques d'une section
  getSectionStats(sectionId: string) {
    const section = this.contentSections.find(s => s.id === sectionId);
    return section ? section.stats : null;
  }
}