import css from './SidebarNotes.module.css';

import Link from 'next/link';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NotesSidebar = () => {
  return (
    <div>
      <ul className={css.menuList}>
        <li key="All" className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSidebar;
