import { useEffect, useState } from 'react';

export const SectionSelector = () => {
  const [sections, setSections] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    // Dynamically fetch sections on mount and if sections are added/removed
    const updateSections = () => {
      const sectionIds = Array.from(document.querySelectorAll('section')).map(
        (sec) => sec.id
      );
      setSections(sectionIds);
      setCurrentSection(sectionIds[0]);
    };

    updateSections();
    window.addEventListener('resize', updateSections);

    return () => {
      window.removeEventListener('resize', updateSections);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find((section) => {
        const sectionElement = document.getElementById(section);
        if (!sectionElement) return false;

        const rect = sectionElement.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY; // Account for page scroll
        const sectionBottom = sectionTop + rect.height;

        return (
          window.scrollY + window.innerHeight / 2 >= sectionTop &&
          window.scrollY + window.innerHeight / 2 < sectionBottom
        );
      });

      if (current) {
        setCurrentSection(current);
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  function handleSectionChange(section: string) {
    setCurrentSection(section);

    if(section === 'hero') {
      scrollTo(0, 0);
      return
    }

    document.getElementById(section)?.scrollIntoView({
      behavior: 'smooth',
    });
  }

  return (
    <div className="fixed bottom-40 right-12 flex flex-col gap-y-4 z-20">
      {sections.map((section) => {
        const isActive = currentSection === section;

        return (
          <div
            key={section}
            className={`size-3 rounded-full cursor-pointer transition-all shadow-sm shadow-foreground/50 ${
              isActive ? 'bg-foreground' : 'bg-gray-300 dark:bg-gray-700'
            }`}
            onClick={() => handleSectionChange(section)}
          />
        );
      })}
    </div>
  );
};
