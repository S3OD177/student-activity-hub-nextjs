export const themes = {
  default: {
    name: "Default Blue",
    primary: "from-blue-600 via-purple-600 to-indigo-700",
    primarySolid: "bg-blue-600",
    primaryHover: "hover:bg-blue-700",
    primaryText: "text-blue-600",
    primaryBorder: "border-blue-500",
    accent: "from-blue-400 to-purple-400",
  },
  green: {
    name: "Forest Green",
    primary: "from-green-600 via-teal-600 to-emerald-700",
    primarySolid: "bg-green-600",
    primaryHover: "hover:bg-green-700",
    primaryText: "text-green-600",
    primaryBorder: "border-green-500",
    accent: "from-green-400 to-teal-400",
  },
  purple: {
    name: "Royal Purple",
    primary: "from-purple-600 via-indigo-600 to-violet-700",
    primarySolid: "bg-purple-600",
    primaryHover: "hover:bg-purple-700",
    primaryText: "text-purple-600",
    primaryBorder: "border-purple-500",
    accent: "from-purple-400 to-indigo-400",
  },
  orange: {
    name: "Sunset Orange",
    primary: "from-orange-600 via-red-600 to-pink-700",
    primarySolid: "bg-orange-600",
    primaryHover: "hover:bg-orange-700",
    primaryText: "text-orange-600",
    primaryBorder: "border-orange-500",
    accent: "from-orange-400 to-red-400",
  },
  pink: {
    name: "Rose Pink",
    primary: "from-pink-600 via-rose-600 to-red-700",
    primarySolid: "bg-pink-600",
    primaryHover: "hover:bg-pink-700",
    primaryText: "text-pink-600",
    primaryBorder: "border-pink-500",
    accent: "from-pink-400 to-rose-400",
  },
  cyan: {
    name: "Ocean Cyan",
    primary: "from-cyan-600 via-blue-600 to-indigo-700",
    primarySolid: "bg-cyan-600",
    primaryHover: "hover:bg-cyan-700",
    primaryText: "text-cyan-600",
    primaryBorder: "border-cyan-500",
    accent: "from-cyan-400 to-blue-400",
  },
}

export type ThemeKey = keyof typeof themes

export const getTheme = (themeKey: ThemeKey = "default") => {
  return themes[themeKey] || themes.default
}
