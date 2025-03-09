import { motion } from "framer-motion";
import { Quote, Github, Globe, Linkedin, Instagram } from "lucide-react";

const leadershipData = {
  title: "Our Inspiration & Chief Patrons",
  subtitle: "Honoring the visionaries who guide us with their wisdom and leadership",
  patrons: [
    {
      id: 1,
      name: "Dr. D. Y. Patil",
      role: "Founder & Patron",
      organization: "D. Y. Patil Group",
      image: "/patrons/DrDYPatil.jpg",
      quote: "Ego is death of life, death of ego is real life. If you follow this principle in life you are bound to succeed"
    },
    {
      id: 2,
      name: "Dr. Vijay D. Patil",
      role: "Vice President",
      organization: "D. Y. Patil Deemed to be University",
      image: "/patrons/VijayPatil.jpg",
      quote: "It always fills me up with the immense joy to see batch after batch of students head out into the world equipped with the power of knowledge and an aspiration to create real impact in the world"
    },
    {
      id: 3,
      name: "Dr. Shivani D. Patil",
      role: "Pro Chancellor and Vice President",
      organization: "Ramrao Adik Institute of Technology",
      image: "/patrons/ShivaniPatil.jpg",
      quote: "Learning is not the filling of a Pail. But the kindling of the Flame."
    }
  ],
};

const principalData = {
  name: "Dr. M. D. Patil",
  role: "Principal",
  organization: "Ramrao Adik Institute of Technology",
  image: "/patrons/MDPatil.jpg",
};

const studentLeadershipData = {
  title: "Student Leadership",
  subtitle: "The driving force behind Technovate 2025",
  leaders: [
    {
      id: 1,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student1.jpg",
      socials: {
        github: "https://github.com/student1",
        linkedin: "https://linkedin.com/in/student1",
        instagram: "https://instagram.com/student1"
      }
    },
    {
      id: 2,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student2.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student2",
        portfolio: "https://student2.dev",
        instagram: "https://instagram.com/student2"
      }
    },
    {
      id: 3,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student3.jpg",
      socials: {
        github: "https://github.com/student3",
        linkedin: "https://linkedin.com/in/student3",
        instagram: "https://instagram.com/student3"
      }
    },
    {
      id: 4,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student4.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student4",
        instagram: "https://instagram.com/student4"
      }
    },
    {
      id: 5,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student4.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student4",
        instagram: "https://instagram.com/student4"
      }
    },
    {
      id: 6,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student4.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student4",
        instagram: "https://instagram.com/student4"
      }
    },
    {
      id: 7,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student4.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student4",
        instagram: "https://instagram.com/student4"
      }
    },
    {
      id: 8,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student4.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student4",
        instagram: "https://instagram.com/student4"
      }
    },
    {
      id: 9,
      name: "Student Name",
      role: "Student Role",
      image: "/leadership/student4.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/student4",
        instagram: "https://instagram.com/student4"
      }
    },
  ]
};

const developmentTeamData = {
  title: "Development Team",
  subtitle: "The developers behind the website",
  members: [
    {
      id: 1,
      name: "Deeptanshu",
      role: "Website Development",
      image: "/team/deeptanshu.jpg",
      socials: {
        github: "https://github.com/deeptanshuu",
        portfolio: "https://deeptanshu.is-a.dev",
        linkedin: "https://www.linkedin.com/in/deeptanshu-l-6868a4187"
      }
    },
    {
      id: 2,
      name: "Pranav",
      role: "Hosting & Code Management",
      image: "/team/pranav.jpg",
      socials: {
        github: "https://github.com/pranav",
        linkedin: "https://linkedin.com/in/pranav",
        instagram: "https://instagram.com/pranav"
      }
    },
    {
      id: 3,
      name: "Jatin",
      role: "UI/UX Design",
      image: "/team/jatin.jpg",
      socials: {
        linkedin: "https://linkedin.com/in/pathakjatin",
        instagram: "https://instagram.com/pathakjatin_"
      }
    },
    {
      id: 4,
      name: "Rushil",
      role: "3D Optimizations",
      image: "/team/rushil.jpg",
      socials: {
        github: "https://github.com/rushil",
        instagram: "https://instagram.com/rushil"
      }
    }
  ],
  additionalContributors: [
    {
      id: 1,
      name: "Vishwajeet",
      role: "UI Development",
      image: "/team/vishwajeet.jpg",
      socials: {
        github: "https://github.com/vishwajeet",
        linkedin: "https://linkedin.com/in/vishwajeet"
      }
    }
  ]
};

export function Leadership() {
  return (
    <section className="bg-black relative overflow-hidden py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Patrons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {leadershipData.title}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            {leadershipData.subtitle}
          </p>
        </motion.div>

        {/* Patrons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {leadershipData.patrons.map((patron, index) => (
            <motion.div
              key={patron.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {/* Image Container */}
                <div className="relative w-full aspect-[9/13] rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={patron.image}
                    alt={patron.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Quote Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-2 text-white/90">
                      <Quote className="w-4 h-4" />
                      <p className="text-sm italic">{patron.quote}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {patron.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-1 group-hover:text-white/80 transition-colors">
                    {patron.role}
                  </p>
                  <p className="text-white/50 text-sm group-hover:text-white/60 transition-colors">
                    {patron.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Principal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Principal
            </h2>
          </div>
          
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {/* Image Container */}
                <div className="relative aspect-[9/13] rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                  <img
                    src={principalData.image}
                    alt={principalData.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {principalData.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-1 group-hover:text-white/80 transition-colors">
                    {principalData.role}
                  </p>
                  <p className="text-white/50 text-sm group-hover:text-white/60 transition-colors">
                    {principalData.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Student Leadership Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {studentLeadershipData.title}
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {studentLeadershipData.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentLeadershipData.leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-neutral-900 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-500">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Social Links */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-black/60 flex items-end md:items-center justify-center gap-4 p-4 md:p-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {leader.socials?.instagram && (
                        <a
                          href={leader.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                      {leader.socials?.github && (
                        <a
                          href={leader.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                      {leader.socials?.linkedin && (
                        <a
                          href={leader.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-white/90 font-medium text-sm mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-white/50 text-xs">
                      {leader.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {developmentTeamData.title}
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {developmentTeamData.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {developmentTeamData.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-neutral-900 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-500">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Social Links */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-black/60 flex items-end md:items-center justify-center gap-4 p-4 md:p-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.socials.instagram && (
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                      {member.socials.github && (
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                      {member.socials.portfolio && (
                        <a
                          href={member.socials.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/90 hover:text-white transition-colors"
                        >
                          <Globe className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-white/90 font-medium text-sm mb-1">
                      {member.name}
                    </h3>
                    <p className="text-white/50 text-xs">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Contributors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Additional Contributors
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {developmentTeamData.additionalContributors.map((contributor, index) => (
                <motion.div
                  key={contributor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-neutral-900/50 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-500">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                      <img
                        src={contributor.image}
                        alt={contributor.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Social Links */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-black/60 flex items-end md:items-center justify-center gap-4 p-4 md:p-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {contributor.socials.github && (
                          <a
                            href={contributor.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/90 hover:text-white transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {contributor.socials.linkedin && (
                          <a
                            href={contributor.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/90 hover:text-white transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-white/90 font-medium text-sm mb-1">
                        {contributor.name}
                      </h3>
                      <p className="text-white/50 text-xs">
                        {contributor.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 