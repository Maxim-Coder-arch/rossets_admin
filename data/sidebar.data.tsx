import CommentsIcon from "@/public/icons/comments";
import HomeIcon from "@/public/icons/home";
import LeadIcon from "@/public/icons/lead";
import LinkIcon from "@/public/icons/link";
import PlusIcon from "@/public/icons/plus";
import RossetIcon from "@/public/icons/rosset";
import SeriesIcon from "@/public/icons/series";

export const sidebarData = [
  {
    label: "Главная",
    link: "/",
    icon: <HomeIcon />
  },
  {
    label: "Серии",
    link: "/admin/series",
    icon: <SeriesIcon />
  },
  {
    label: "Все розетки",
    link: "/admin/rossets",
    icon: <RossetIcon />
  },
  {
    label: "Добавление розетки",
    link: "/admin/add-rosset",
    icon: <PlusIcon />
  },
  {
    label: "Заявки",
    link: "/admin/leads",
    icon: <LeadIcon />
  },
  {
    label: "Отзывы",
    link: "/admin/reviews",
    icon: <CommentsIcon />
  },
  {
    label: "Перейти на сайт",
    link: "https://rosset.ru",
    icon: <LinkIcon />
  },
]