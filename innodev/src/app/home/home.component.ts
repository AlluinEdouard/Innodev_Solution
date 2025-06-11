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

  // Données pour les capability items avec les nouveaux textes simplifiés
  capabilityData = {
    'custom-software': {
      title: 'Logiciel sur mesure',
      description: 'Nous concevons des logiciels sur mesure pour répondre précisément à vos besoins, simplifier vos processus et optimiser votre productivité. Nos solutions digitales sont pensées pour soutenir votre croissance et s\'adapter à vos objectifs uniques.'
    },
    'website': {
      title: 'Site internet',
      description: 'Nous créons des sites internet sur mesure, pensés pour refléter votre identité et atteindre vos objectifs. Grâce à notre expertise, nous développons des plateformes performantes et optimisées pour offrir une expérience utilisateur fluide et favoriser votre croissance en ligne.'
    },
    'application': {
      title: 'Application',
      description: 'Nous concevons des applications mobiles sur mesure, adaptées à vos besoins et aux attentes de vos utilisateurs. Avec notre expertise, nous développons des solutions intuitives et performantes pour renforcer votre présence mobile et optimiser l\'engagement de vos clients.'
    },
    'automation': {
      title: 'Automatisation',
      description: 'Nous vous aidons à automatiser vos processus pour gagner en efficacité et réduire les tâches répétitives. Grâce à des solutions sur mesure, nous optimisons vos workflows pour vous permettre de vous concentrer sur l\'essentiel et d\'accroître votre productivité.'
    },
    'consulting': {
      title: 'Conseil',
      description: 'Nous vous accompagnons avec un service de conseil dédié, pour identifier et mettre en œuvre les solutions digitales les mieux adaptées à vos défis. Notre expertise vous guide à chaque étape, de la stratégie à l\'optimisation, pour garantir des résultats concrets et durables.'
    }
  };

  // Données étendues pour la section key elements
  keyElementsData = {
    title: 'Éléments clés de notre expertise digitale',
    description: 'Avec plus de 10 ans d\'expérience cumulée dans le développement sur mesure, nous accompagnons nos clients dans leur transformation digitale complète en leur offrant des solutions personnalisées, innovantes et parfaitement adaptées à leurs besoins spécifiques. Notre approche collaborative et centrée sur vos objectifs métier nous permet de créer des outils digitaux performants qui s\'intègrent harmonieusement à votre environnement professionnel, automatisent efficacement vos processus complexes, vous font gagner un temps précieux au quotidien et soutiennent concrètement votre croissance durable dans un écosystème numérique en constante évolution.',
    features: [
      {
        icon: 'assets/experience.png',
        counter: 10,
        text: 'ans d\'expérience cumulée en développement'
      },
      {
        icon: 'assets/creation.png',
        counter: 2023,
        text: 'Création d\'Innodev - Expertise moderne'
      },
      {
        icon: 'assets/collaborators.png',
        counter: 4,
        text: 'collaborateurs expérimentés et passionnés'
      },
      {
        icon: 'assets/projects.png',
        counter: 28,
        text: 'projets réalisés avec succès et satisfaction'
      },
      {
        icon: 'assets/clients.png',
        counter: 22,
        text: 'clients fidèles et recommandations'
      }
    ]
  };

  // Données étendues pour la section capabilities
  capabilitiesData = {
    title: 'Sur quoi nous sommes capables d\'agir efficacement',
    intro: 'Chez Innodev, nous sommes une équipe de développeurs passionnés, créatifs et expérimentés qui transformons vos idées les plus ambitieuses en solutions digitales concrètes, robustes et parfaitement adaptées à vos besoins. Notre expertise technique approfondie et notre compréhension fine des enjeux business couvrent tous les aspects du développement moderne, des technologies web les plus récentes aux solutions mobiles innovantes, en passant par l\'automatisation intelligente des processus métier. Nous vous accompagnons efficacement dans votre transformation digitale complète pour assurer votre réussite durable et votre compétitivité dans un environnement numérique en constante évolution.'
  };

  constructor() { }

  ngOnInit(): void {
    // Initialisation des données dynamiques si nécessaire
    this.initializeComponentData();
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
    setTimeout(() => {
      this.initAnimations();
    }, 100);
  }

  // Initialiser les données du composant
  private initializeComponentData(): void {
    // Mise à jour dynamique des textes si nécessaire
    // Cette méthode peut être étendue pour des mises à jour dynamiques
  }

  // Fonction pour redémarrer la vidéo quand elle se termine
  restartVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      video.play().catch(error => {
        console.log('Erreur lors de la lecture de la vidéo:', error);
      });
    }
  }

  // Initialiser toutes les animations GSAP avec des améliorations
  private initAnimations(): void {
    // Animation pour le content-overlay avec décalage vers la droite
    this.animateContentOverlay();
    
    // Animation pour le content-section avec effet d'apparition fluide
    this.animateContentSection();
    
    // Animation des compteurs avec des valeurs mises à jour
    this.animateCounters();
    
    // Animations pour les capability-items avec nouveaux textes
    this.animateCapabilityItems();
    
    // Animation pour les icônes des features avec effet de rotation amélioré
    this.animateFeatureIcons();
    
    // Animation pour le titre principal avec décalage
    this.animateMainTitle();
    
    // Animation pour le slogan avec décalage
    this.animateSlogan();

    // Nouvelles animations pour les éléments étendus
    this.animateExtendedContent();
  }

  // Animation du content-overlay avec décalage vers la droite pour alignement
  private animateContentOverlay(): void {
    const contentOverlay = document.querySelector('.content-overlay');
    
    if (contentOverlay) {
      // Animation initiale avec décalage vers la droite
      gsap.fromTo(contentOverlay, 
        {
          x: -120,
          opacity: 0,
          scale: 0.95
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentOverlay,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol améliorée
      contentOverlay.addEventListener('mouseenter', () => {
        gsap.to(contentOverlay, {
          x: 10,
          scale: 1.02,
          duration: 0.6,
          ease: "power2.out"
        });
      });

      contentOverlay.addEventListener('mouseleave', () => {
        gsap.to(contentOverlay, {
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }
  }

  // Animation du content-section avec effets améliorés
  private animateContentSection(): void {
    const contentSection = document.querySelector('.content-section');
    
    if (contentSection) {
      gsap.fromTo(contentSection,
        {
          y: 120,
          opacity: 0,
          scale: 0.98
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentSection,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol avec effet subtil
      contentSection.addEventListener('mouseenter', () => {
        gsap.to(contentSection, {
          y: -5,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      contentSection.addEventListener('mouseleave', () => {
        gsap.to(contentSection, {
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }

  // Animation des compteurs avec nouvelles valeurs
  private animateCounters(): void {
    const counters = document.querySelectorAll('.feature-counter');
    
    counters.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      let duration = 1.5;
      
      // Durée adaptée selon la valeur
      if (target > 100) duration = 2.2;
      if (target > 1000) duration = 2.8;
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(counter, 
            { 
              innerHTML: 0,
              opacity: 0,
              scale: 0.5,
              rotation: -10
            },
            { 
              innerHTML: target,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: duration,
              delay: index * 0.25,
              ease: "back.out(1.2)",
              snap: { innerHTML: 1 },
              onUpdate: function() {
                const currentVal = Math.ceil(parseFloat(counter.innerHTML));
                counter.innerHTML = currentVal.toString();
              }
            }
          );
        }
      });

      // Animation au survol pour les compteurs
      counter.addEventListener('mouseenter', () => {
        gsap.to(counter, {
          scale: 1.1,
          color: '#3a9bc1',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      counter.addEventListener('mouseleave', () => {
        gsap.to(counter, {
          scale: 1,
          color: '#4BA4CE',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  // Animations des capability-items avec nouveaux textes
  private animateCapabilityItems(): void {
    // Items normaux (depuis la gauche)
    const normalItems = document.querySelectorAll('.capability-item:not(.mirror)');
    
    normalItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          x: -120,
          opacity: 0,
          scale: 0.95
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol améliorée
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          x: 15,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    // Items mirror (depuis la droite)
    const mirrorItems = document.querySelectorAll('.capability-item.mirror');
    
    mirrorItems.forEach((item, index) => {
      gsap.fromTo(item,
        {
          x: 120,
          opacity: 0,
          scale: 0.95
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
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
        gsap.to(item, {
          x: -15,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    // Animation pour le titre principal de la section capabilities
    const capabilitiesTitle = document.querySelector('.capabilities-main-title');
    if (capabilitiesTitle) {
      gsap.fromTo(capabilitiesTitle,
        {
          y: -60,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: capabilitiesTitle,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation pour l'intro étendue
    const capabilitiesIntro = document.querySelector('.capabilities-intro');
    if (capabilitiesIntro) {
      gsap.fromTo(capabilitiesIntro,
        {
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: capabilitiesIntro,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation pour les séparateurs avec effet étendu
    const separators = document.querySelectorAll('.separator');
    separators.forEach((separator, index) => {
      gsap.fromTo(separator,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "center"
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: separator,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  // Animation des icônes avec effets améliorés
  private animateFeatureIcons(): void {
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach((icon, index) => {
      // Animation d'apparition avec rotation et bounce
      gsap.fromTo(icon,
        {
          scale: 0,
          rotation: -240,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: icon,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol améliorée
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.15,
          rotation: 15,
          boxShadow: "0 8px 25px rgba(75, 164, 206, 0.3)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    // Animation pour les images des capabilities
    const capabilityImages = document.querySelectorAll('.capability-image');
    
    capabilityImages.forEach((image, index) => {
      // Animation au survol pour les images
      image.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.05,
          rotation: 2,
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
          duration: 0.4,
          ease: "power2.out"
        });
      });

      image.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          rotation: 0,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
  }

  // Animation pour le titre principal avec décalage
  private animateMainTitle(): void {
    const mainTitle = document.querySelector('.main-title');
    
    if (mainTitle) {
      // Diviser le texte en mots pour une animation plus fluide
      const text = mainTitle.textContent || '';
      const words = text.split(' ');
      mainTitle.innerHTML = '';
      
      // Créer des spans pour chaque mot
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.3em';
        mainTitle.appendChild(span);
      });

      // Animer chaque mot avec décalage vers la droite
      const wordSpans = mainTitle.querySelectorAll('span');
      gsap.fromTo(wordSpans,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          x: -30
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
          stagger: 0.1,
          delay: 0.5
        }
      );
    }
  }

  // Animation pour le slogan avec décalage
  private animateSlogan(): void {
    const sloganContainer = document.querySelector('.slogan-container');
    
    if (sloganContainer) {
      gsap.fromTo(sloganContainer,
        {
          scale: 0,
          opacity: 0,
          x: -20
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "back.out(1.3)",
          delay: 1.5
        }
      );

      // Animation au survol pour le slogan
      sloganContainer.addEventListener('mouseenter', () => {
        gsap.to(sloganContainer, {
          scale: 1.05,
          y: -8,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      sloganContainer.addEventListener('mouseleave', () => {
        gsap.to(sloganContainer, {
          scale: 1,
          y: 0,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  }

  // Nouvelles animations pour le contenu étendu
  private animateExtendedContent(): void {
    // Animation pour le titre de section avec underline
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
      gsap.fromTo(title,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation de l'underline
      const underline = title.querySelector('::after');
      if (underline) {
        gsap.fromTo(title,
          { '--underline-width': '0%' },
          { 
            '--underline-width': '100%',
            duration: 0.8,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animation pour les descriptions étendues
    const descriptions = document.querySelectorAll('.key-elements-description, .capabilities-intro p');
    descriptions.forEach((desc, index) => {
      gsap.fromTo(desc,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: desc,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animation pour les textes highlight
    const highlights = document.querySelectorAll('.highlight-text');
    highlights.forEach((highlight, index) => {
      highlight.addEventListener('mouseenter', () => {
        gsap.to(highlight, {
          scale: 1.05,
          color: '#3a9bc1',
          duration: 0.3,
          ease: "power2.out"
        });
      });

      highlight.addEventListener('mouseleave', () => {
        gsap.to(highlight, {
          scale: 1,
          color: '#4BA4CE',
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
}