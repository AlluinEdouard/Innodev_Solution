import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgFor, NgIf, SlicePipe } from '@angular/common';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Realisation {
  id: number;
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-realisations',
  imports: [NgFor, NgIf, SlicePipe],
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss']
})
export class RealisationsComponent implements OnInit, AfterViewInit {
  videoSource: string = 'assets/background-video-realisations.mp4';
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('wheelTrack') wheelTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselWheel') carouselWheel!: ElementRef<HTMLDivElement>;
  
  currentSlide: number = 0;
  private itemWidth: number = 270; // Largeur d'un item + gap
  
  realisations: Realisation[] = [
    {
      id: 1,
      title: 'Planification',
      image: 'assets/planification.png',
      description: 'Développement d\'une application mobile dédiée à la gestion des plannings des agents de sécurité.'
    },
    {
      id: 2,
      title: 'WMS_Logistique',
      image: 'assets/WMS_logistique.png',
      description: 'WMS pour un entrepôt de 4000m2, intégrant des tablettes pour les utilisateurs et le scan des palettes à l\'entrée et à la sortie, avec suivi des mouvements, reporting, facturation, classement automatique et analyse en temps réel des rotations pour une optimisation et rangement.'
    },
    {
      id: 3,
      title: 'Gestion_Atelier',
      image: 'assets/gestion_atelier.png',
      description: 'Pour un garage VL & PL, création d\'application pour la gestion opérationnelle complète : ordres de travail, facturation, planification, gestion des stocks, commandes, etc.'
    },
    {
      id: 4,
      title: 'TMS / Planification',
      image: 'assets/tms_planification.png',
      description: 'Pour une PME de 250 salariés, outil de planification des transports pour 100 conduteurs sur deux écrans géants tactiles'
    },
    {
      id: 5,
      title: 'Application mobile',
      image: 'assets/application_mobile.png',
      description: 'Application pour conducteurs routiers, conçue pour la gestion quotidienne des opérations : planning, temps de service, congés, messagerie, etc.'
    },
    {
      id: 6,
      title: 'Site vitrine',
      image: 'assets/site_vitrine.png',
      description: 'Site vitrine'
    },
    {
      id: 7,
      title: 'Gestion petits colis',
      image: 'assets/gestion_petits_colis.png',
      description: 'Pour une entreprise de transport de petits colis, nous avons développé une application complète pour la gestion des heures, la planification, la facturation et la gestion du parc.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Démarrer le carousel automatique
    this.startAutoCarousel();
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
    
    // Initialiser la position du carousel
    this.updateWheelPosition();
  }

  // Fonction pour redémarrer la vidéo quand elle se termine
  restartVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      video.play();
    }
  }

  // Gestion du carousel automatique
  startAutoCarousel(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change de slide toutes les 5 secondes
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.realisations.length;
    this.updateWheelPosition();
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.realisations.length - 1 : this.currentSlide - 1;
    this.updateWheelPosition();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateWheelPosition();
  }

  // Vérifier si un item est adjacent à l'item actif
  isAdjacent(index: number): boolean {
    const diff = Math.abs(index - this.currentSlide);
    return diff === 1 || diff === this.realisations.length - 1;
  }

  // Mise à jour de la position de la roue horizontale
  updateWheelPosition(): void {
    if (this.wheelTrack && this.wheelTrack.nativeElement) {
      // Calculer le décalage pour centrer l'item actif
      const containerWidth = this.carouselWheel?.nativeElement?.offsetWidth || 800;
      const centerOffset = containerWidth / 2;
      const itemCenterOffset = this.itemWidth / 2;
      const translateX = centerOffset - itemCenterOffset - (this.currentSlide * this.itemWidth);
      
      gsap.to(this.wheelTrack.nativeElement, {
        x: translateX,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  }

  // Obtenir la réalisation actuellement active
  getCurrentRealisation(): Realisation {
    return this.realisations[this.currentSlide];
  }

  // Vérifier si on peut naviguer vers la gauche
  canNavigateLeft(): boolean {
    return this.realisations.length > 1;
  }

  // Vérifier si on peut naviguer vers la droite
  canNavigateRight(): boolean {
    return this.realisations.length > 1;
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le titre principal
    this.animateTitle();
    
    // Animation pour le carousel
    this.animateCarousel();
  }

  // Animation du titre principal
  private animateTitle(): void {
    const title = document.querySelector('.main-title');
    
    if (title) {
      gsap.fromTo(title, 
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }

  // Animation du carousel
  private animateCarousel(): void {
    const carouselContainer = document.querySelector('.carousel-wheel-container');
    
    if (carouselContainer) {
      gsap.fromTo(carouselContainer,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: carouselContainer,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animation de la zone de détails
    const detailsContainer = document.querySelector('.details-container');
    
    if (detailsContainer) {
      gsap.fromTo(detailsContainer,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
          scrollTrigger: {
            trigger: detailsContainer,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }
}