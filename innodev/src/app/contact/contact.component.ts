import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Interface pour le formulaire de contact
interface ContactForm {
  nom: string;
  prenom: string;
  email: string;
  numero?: string;
  besoins?: string;
}

// Déclaration globale pour SweetAlert2
declare var Swal: any;

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('contactContainer') contactContainer!: ElementRef;
  @ViewChild('contactForm') contactFormElement!: ElementRef;

  // Données du formulaire
  formData = {
    nom: '',
    prenom: '',
    email: '',
    numero: '',
    besoins: ''
  };

  private timeline!: gsap.core.Timeline;

  ngAfterViewInit(): void {
    // Initialiser la vidéo et les animations
    setTimeout(() => {
      this.initVideo();
      this.initAnimations();
    }, 100);
  }

  private initVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true;
      video.playsInline = true;

      // Forcer le démarrage de la vidéo
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Vidéo démarrée avec succès');
          })
          .catch(error => {
            console.error('Erreur lors du démarrage de la vidéo:', error);
          });
      }

      // Gérer la fin de la vidéo pour la relancer
      video.addEventListener('ended', () => {
        this.restartVideo();
      });

      // Gérer les erreurs de chargement
      video.addEventListener('error', (e) => {
        console.error('Erreur de chargement de la vidéo:', e);
      });
    }
  }

  private initAnimations(): void {
    // Animation d'entrée du container principal
    this.animateContainerEntrance();
    
    // Animation des éléments du formulaire
    this.animateFormElements();
    
    // Animation du titre vidéo
    this.animateVideoTitle();
    
    // Animation hover pour les inputs
    this.setupInputHoverAnimations();
    
    // Animation de soumission
    this.setupSubmitAnimation();
  }

  private animateContainerEntrance(): void {
    if (this.contactContainer) {
      const container = this.contactContainer.nativeElement;
      
      // Timeline principale d'entrée
      this.timeline = gsap.timeline({
        delay: 0.5
      });

      // Animation du container principal
      this.timeline
        .set(container, {
          opacity: 0,
          x: 100,
          scale: 0.95
        })
        .to(container, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        });

      // Animation des titres
      const titles = container.querySelectorAll('h1, h2');
      this.timeline
        .from(titles, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=0.6");
    }
  }

  private animateFormElements(): void {
    if (this.contactFormElement) {
      const formGroups = this.contactFormElement.nativeElement.querySelectorAll('.form-group');
      const submitBtn = this.contactFormElement.nativeElement.querySelector('.submit-btn');

      // Animation des groupes de formulaire
      gsap.set(formGroups, {
        y: 30,
        opacity: 0
      });

      gsap.set(submitBtn, {
        y: 40,
        opacity: 0,
        scale: 0.9
      });

      // Timeline pour les éléments du formulaire
      const formTimeline = gsap.timeline({
        delay: 1.2
      });

      formTimeline
        .to(formGroups, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        })
        .to(submitBtn, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.3");
    }
  }

  private animateVideoTitle(): void {
    const videoTitle = document.querySelector('.video-title');
    if (videoTitle) {
      // Animation de pulsation subtile pour le titre vidéo
      gsap.to(videoTitle, {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Animation d'entrée du titre
      gsap.from(videoTitle, {
        opacity: 0,
        scale: 0.8,
        rotationY: 90,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3
      });
    }
  }

  private setupInputHoverAnimations(): void {
    if (this.contactFormElement) {
      const inputs = this.contactFormElement.nativeElement.querySelectorAll('.form-control');
      
      inputs.forEach((input: HTMLElement) => {
        // Animation au focus
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Animation du label
          const label = input.previousElementSibling;
          if (label) {
            gsap.to(label, {
              color: '#FFFFFF',
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        // Animation au blur
        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Retour du label
          const label = input.previousElementSibling;
          if (label) {
            gsap.to(label, {
              color: '#4BA4CE',
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    }
  }

  private setupSubmitAnimation(): void {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', () => {
        gsap.to(submitBtn, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      submitBtn.addEventListener('mouseleave', () => {
        gsap.to(submitBtn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  }

  // Fonction pour redémarrer la vidéo quand elle se termine
  restartVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Erreur lors du redémarrage de la vidéo:', error);
        });
      }
    }
  }

  onSubmit() {
    console.log('Formulaire soumis:', this.formData);
    
    // Animation de soumission
    this.animateSubmission();
    
    // Simulation d'envoi avec SweetAlert2
    setTimeout(() => {
      // Vérifier si SweetAlert2 est disponible
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Message envoyé !',
          text: 'Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4BA4CE',
          background: '#25384A',
          color: '#FFFFFF',
          customClass: {
            popup: 'custom-swal-popup'
          },
          draggable: true
        }).then(() => {
          this.resetForm();
          this.animateFormReset();
        });
      } else {
        // Fallback si SweetAlert2 n'est pas chargé
        alert('Votre message a été envoyé avec succès !');
        this.resetForm();
        this.animateFormReset();
      }
    }, 1500);
  }

  private animateSubmission(): void {
    const submitBtn = document.querySelector('.submit-btn');
    const formGroups = document.querySelectorAll('.form-group');

    if (submitBtn) {
      // Animation du bouton de soumission
      const submitTimeline = gsap.timeline();
      
      submitTimeline
        .to(submitBtn, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.inOut"
        })
        .to(submitBtn, {
          scale: 1.1,
          backgroundColor: '#2ECC71',
          duration: 0.4,
          ease: "back.out(1.7)"
        })
        .to(submitBtn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });

      // Animation des champs du formulaire
      gsap.to(formGroups, {
        scale: 0.98,
        opacity: 0.7,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.inOut"
      });
    }
  }

  private animateFormReset(): void {
    const formControls = document.querySelectorAll('.form-control');
    const submitBtn = document.querySelector('.submit-btn');
    const formGroups = document.querySelectorAll('.form-group');

    // Remettre le bouton à la normale
    if (submitBtn) {
      gsap.to(submitBtn, {
        backgroundColor: '#4BA4CE',
        duration: 0.5,
        ease: "power2.out"
      });
    }

    // Animation de reset des champs
    gsap.to(formGroups, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    });

    // Animation spéciale pour les inputs
    gsap.from(formControls, {
      x: -10,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.3
    });
  }

  resetForm() {
    this.formData = {
      nom: '',
      prenom: '',
      email: '',
      numero: '',
      besoins: ''
    };
  }

  ngOnDestroy(): void {
    // Nettoyage des animations et événements
    if (this.timeline) {
      this.timeline.kill();
    }
    
    // Nettoyer ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}