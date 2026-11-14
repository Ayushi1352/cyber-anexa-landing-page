export interface ThemeFonts {
  primary: string;
  heading: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  icon: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ContactItem {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  url: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface CompanyData {
  name: string;
  logo: string;
  logoLight: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contactItems: ContactItem[];
  socialLinks: SocialLink[];
}

export interface FooterData {
  description: string;
  quickLinksTitle: string;
  servicesTitle?: string;
  contactTitle: string;
  copyrightText: string;
  motto: string[];
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export interface IconCard {
  id: string;
  icon: string;
  title: string;
  text: string;
}

export interface HeroData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  imageAlt: string;
  alert: {
    title: string;
    text: string;
    time: string;
  };
  status: {
    label: string;
    value: string;
  };
  monitoring: string;
}

export interface AboutPoint extends IconCard {
  number: string;
}

export interface AboutData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  paragraphs: string[];
  primaryImage: string;
  primaryImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  badge: {
    value: string;
    label: string;
  };
  points: AboutPoint[];
}

export interface ServiceItem extends IconCard {
  image: string;
}

export interface ServicesData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  swipeHint: string;
  linkText: string;
  linkUrl: string;
  items: ServiceItem[];
}

export interface WhyData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  live: {
    title: string;
    text: string;
  };
  items: IconCard[];
}

export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  image: string;
}

export interface ProjectsData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  items: ProjectItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface TeamData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  previousLabel: string;
  nextLabel: string;
  members: TeamMember[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  image: string;
  quote: string;
}

export interface TestimonialsData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  rating: number;
  ratingOutOf: string;
  ratingLabel: string;
  ratingText: string;
  previousLabel: string;
  nextLabel: string;
  showLabel: string;
  items: TestimonialItem[];
}

export interface ContactData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  image: string;
  form: {
    title: string;
    titleAccent: string;
    description: string;
  };
}

export interface FormField {
  label: string;
  placeholder: string;
  required: boolean;
}

export interface QuoteFormData {
  fields: {
    name: FormField;
    email: FormField;
    company: FormField;
    phone: FormField;
    service: FormField;
    budget: FormField;
    message: FormField;
  };
  serviceOptions: string[];
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface CyberSecurityTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    CyberSecurity: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Why?: Variants<WhyData>;
        Projects?: Variants<ProjectsData>;
        Team?: Variants<TeamData>;
        Testimonials?: Variants<TestimonialsData>;
        Contact?: Variants<ContactData>;
        QuoteForm?: Variants<QuoteFormData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
