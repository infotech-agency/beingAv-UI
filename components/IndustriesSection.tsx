import { Link } from 'react-router-dom';
import { Building2, GraduationCap, Church, Hospital, Hotel, Radio } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const industries = [
  {
    icon: Building2,
    title: 'Corporate & Enterprises',
    desc: 'Meeting rooms, training rooms, and executive spaces.',
    image: 'https://3.imimg.com/data3/BJ/OK/MY-4404215/cooperate-office-interior.jpg',
    link: '/services/corporate-and-enterprise',
  },
  {
    icon: GraduationCap,
    title: 'Education & Learning',
    desc: 'Smart classrooms, lecture halls, and hybrid learning.',
    image: 'https://ceeco.in/blog/wp-content/uploads/2024/07/Image-1-1-scaled.jpg',
    link: '/services/education-and-learning',
  },
  {
    icon: Church, // ✅ Changed from Landmark to Church
    title: 'House of Worship',
    desc: 'Sanctuary projection, PTZ tracking, live-streaming, and overflow audio/video.',
    // ✅ Better image for House of Worship (modern church interior)
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Bah%C3%A1%27%C3%AD_House_of_Worship_in_Port_Moresby.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    link: '/services/house-of-worship',
  },
  {
    icon: Hospital,
    title: 'Healthcare',
    desc: 'Medical AV, telemedicine, and digital signage.',
    image: 'https://resurgent.co.in/wp-content/themes/resurgent/assets/home/healthcare.webp',
    link: '/services/healthcare',
  },
  {
    icon: Hotel,
    title: 'Hospitality & Entertainment',
    desc: 'Guest room entertainment and event venues.',
    image: 'https://content.jdmagicbox.com/comp/def_content/banquet-halls/banquet-halls-2-banquet-halls-15-iuu57.jpg',
    link: '/services/hospitality-and-entertainment',
  },
  {
    icon: Radio,
    title: 'Broadcast & Media',
    desc: 'Production studios and broadcast facilities.',
    image: 'https://www.theswitch.tv/wp-content/uploads/the-switch-production-control-1156x650.jpg',
    link: '/services/broadcast-and-media',
  },
];

export function IndustriesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Solutions for every sector"
          description="From boardrooms to broadcast studios, BeingAV powers AV across industries."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            // ✅ Each card is now a clickable Link
            <Link
              to={ind.link}
              key={ind.title}
              className="group block h-56 [perspective:1000px]"
            >
              <div className="relative h-full w-full rounded-lg transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex flex-col rounded-lg border border-border bg-white p-6 [backface-visibility:hidden]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-foreground">
                    <ind.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{ind.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{ind.desc}</p>
                </div>

                {/* Back – image revealed on flip */}
                <div className="absolute inset-0 overflow-hidden rounded-lg border border-red-800 shadow-[0_20px_50px_-12px_rgba(153,27,27,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <ind.icon className="h-5 w-5 text-white" />
                    <h3 className="mt-1.5 font-bold text-white">{ind.title}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}