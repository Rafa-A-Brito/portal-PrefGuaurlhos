import {
  BuildingLibraryIcon,
  SparklesIcon,
  GlobeAltIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/**
 * Metadados centralizados por categoria de patrimônio — label exibido e
 * ícone (Heroicons) usados no badge do PlaquetaCard, na FiltroBar e nos
 * chips de categoria da Home. Mantenha as chaves iguais às usadas no
 * campo "categoria" do db.json / patrimoniosMock.json.
 */
export const CATEGORIA_META = {
  arquitetonico: {
    label: "Arquitetônico",
    Icon: BuildingLibraryIcon,
  },
  imaterial: {
    label: "Imaterial",
    Icon: SparklesIcon,
  },
  natural: {
    label: "Natural",
    Icon: GlobeAltIcon,
  },
  documental: {
    label: "Documental",
    Icon: DocumentTextIcon,
  },
};
