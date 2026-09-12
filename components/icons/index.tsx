/**
 * Ojo icon set — the app's own icons, on the web.
 *
 * The app draws its own Feather-style line icons (see `src/components/icons/`
 * and `src/components/shared/HangerIcon`) rather than pulling an icon library.
 * The site used to use Lucide, which is a different hand: different stroke
 * weight, different corner treatment, different optical sizing. Swapping the
 * library for these is most of what made the site's chrome read as generic.
 *
 * Two groups below:
 *   PORTED  — path data copied verbatim from the app. Do not redraw these.
 *   MATCHED — shapes the app has no icon for, drawn in the same language:
 *             24×24 box, stroke only, 1.6 weight, round caps and joins, and
 *             the same 2px-from-the-edge optical margin.
 *
 * `color` defaults to currentColor so callers style them with text utilities.
 */

interface IconProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
}

/** Shared attributes — the app's `base()` helper, minus the RN a11y props. */
const base = (size: number, color: string, strokeWidth: number, className?: string) => ({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    className,
});

type Icon = (p: IconProps) => JSX.Element;

const icon =
    (body: (c: string) => React.ReactNode, defaults: Partial<IconProps> = {}): Icon =>
    ({ size = 18, color = 'currentColor', strokeWidth = 1.6, className }: IconProps) => (
        <svg {...base(size, color, defaults.strokeWidth ?? strokeWidth, className)}>
            {body(color)}
        </svg>
    );

// ─── PORTED — verbatim from the app ──────────────────────────────────────────

/** app: shared/HangerIcon. The closet mark. */
export const HangerIcon = icon(() => (
    <path d='M12 4a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V9l8 5.5A1 1 0 0 1 20 16H4a1 1 0 0 1-.99-1.5L11 9V7.73A2 2 0 0 1 12 4Z' />
), { strokeWidth: 1.5 });

/** app: icons/SuitcaseIcon */
export const SuitcaseIcon = icon(() => (
    <>
        <rect x={3} y={7} width={18} height={13} rx={2} />
        <path d='M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
        <path d='M3 12h18' />
    </>
));

/** app: icons/CameraIcon */
export const CameraIcon = icon(() => (
    <>
        <path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' />
        <circle cx={12} cy={13} r={4} />
    </>
));

/** app: icons/GlyphIcons — PlaneIcon */
export const PlaneIcon = icon(() => (
    <>
        <path d='M22 2 11 13' />
        <path d='M22 2 15 22l-4-9-9-4z' />
    </>
));

/** app: icons/LocationsIcon — the saved-cities pin. */
export const PinIcon = icon(() => (
    <>
        <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z' />
        <circle cx={12} cy={10} r={3} />
    </>
), { strokeWidth: 1.5 });

/** app: icons/ClosetIcons — SearchIcon */
export const SearchIcon = icon(() => (
    <>
        <circle cx={11} cy={11} r={7} />
        <path d='M21 21l-4.3-4.3' />
    </>
), { strokeWidth: 1.5 });

/** app: icons/ClosetIcons — GridIcon */
export const GridIcon = icon(() => (
    <>
        <rect x={4} y={4} width={7} height={7} rx={1.5} />
        <rect x={13} y={4} width={7} height={7} rx={1.5} />
        <rect x={13} y={13} width={7} height={7} rx={1.5} />
        <rect x={4} y={13} width={7} height={7} rx={1.5} />
    </>
), { strokeWidth: 1.5 });

/** app: icons/ClosetIcons — ChevronRightIcon */
export const ChevronRightIcon = icon(() => <path d='M9 6l6 6-6 6' />, { strokeWidth: 1.5 });

/** app: icons/ClosetIcons — CheckIcon */
export const CheckIcon = icon(() => <path d='M20 6L9 17l-5-5' />, { strokeWidth: 1.8 });

/** app: icons/ClosetIcons — CloseIcon */
export const CloseIcon = icon(() => <path d='M18 6L6 18M6 6l12 12' />);

/** app: icons/ClosetIcons — MoreIcon */
export const MoreIcon = icon((c) => (
    <>
        <circle cx={5} cy={12} r={1.4} fill={c} stroke='none' />
        <circle cx={12} cy={12} r={1.4} fill={c} stroke='none' />
        <circle cx={19} cy={12} r={1.4} fill={c} stroke='none' />
    </>
), { strokeWidth: 1.5 });

// ─── MATCHED — drawn to the same spec ────────────────────────────────────────

/** The four-pointed sparkle from the app's star field (waist ratio 0.12). */
export const SparkleIcon = icon((c) => (
    <>
        <path d='M12 3 13 10.2 20 12l-7 1.8L12 21l-1-7.2L4 12l7-1.8z' fill={c} stroke='none' />
        <path d='M18.5 3.5 19 5.6 21 6l-2 .4-.5 2.1-.5-2.1L16 6l2-.4z' fill={c} stroke='none' />
    </>
));

export const LayersIcon = icon(() => (
    <>
        <path d='M12 3 3 8l9 5 9-5z' />
        <path d='M3 13l9 5 9-5' />
        <path d='M3 17.5 12 22l9-4.5' />
    </>
));

export const FingerprintIcon = icon(() => (
    <>
        <path d='M12 4a7 7 0 0 0-7 7v2' />
        <path d='M19 13v-2a7 7 0 0 0-3.5-6.05' />
        <path d='M8.5 12a3.5 3.5 0 0 1 7 0v4' />
        <path d='M12 12v6' />
        <path d='M5.5 17.5A9 9 0 0 0 7 20.5' />
        <path d='M18.5 16a12 12 0 0 1-.6 4' />
    </>
));

export const BarsIcon = icon(() => (
    <>
        <path d='M5 20v-6' />
        <path d='M12 20V6' />
        <path d='M19 20v-9' />
    </>
), { strokeWidth: 1.8 });

export const HistoryIcon = icon(() => (
    <>
        <path d='M3.5 10a9 9 0 1 1 .8 5' />
        <path d='M3 5v5h5' />
        <path d='M12 7.5V12l3 2' />
    </>
));

export const FolderIcon = icon(() => (
    <>
        <path d='M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
        <path d='M3 11h18' />
    </>
));

export const BellIcon = icon(() => (
    <>
        <path d='M18 9a6 6 0 1 0-12 0c0 5-2 6.5-2 6.5h16S18 14 18 9' />
        <path d='M13.7 19a2 2 0 0 1-3.4 0' />
    </>
));

export const WidgetIcon = icon(() => (
    <>
        <rect x={3} y={3} width={9} height={9} rx={2.2} />
        <rect x={14.5} y={3} width={6.5} height={6.5} rx={2} />
        <rect x={3} y={14.5} width={6.5} height={6.5} rx={2} />
        <rect x={12} y={12} width={9} height={9} rx={2.2} />
    </>
), { strokeWidth: 1.5 });

export const CalendarCheckIcon = icon(() => (
    <>
        <rect x={3.5} y={5} width={17} height={16} rx={2.4} />
        <path d='M8 3v4M16 3v4M3.5 10h17' />
        <path d='M9 15.5l2 2 4-4' />
    </>
));

export const CloudIcon = icon(() => (
    <path d='M7 19a4.5 4.5 0 0 1-.3-9A6 6 0 0 1 18 10.5a3.9 3.9 0 0 1-.4 8.5z' />
));

export const MailIcon = icon(() => (
    <>
        <rect x={2.5} y={5} width={19} height={14} rx={2.4} />
        <path d='M3.5 7.5 12 13l8.5-5.5' />
    </>
));

export const ShieldCheckIcon = icon(() => (
    <>
        <path d='M12 2.5 20 5.5v6c0 5-3.4 8.6-8 10.5-4.6-1.9-8-5.5-8-10.5v-6z' />
        <path d='M9 12l2.2 2.2L15.5 10' />
    </>
));

export const FileTextIcon = icon(() => (
    <>
        <path d='M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z' />
        <path d='M14 2.5v5h5' />
        <path d='M8.5 13h7M8.5 17h5' />
    </>
));

export const TrashIcon = icon(() => (
    <>
        <path d='M4 6.5h16' />
        <path d='M9 6.5V4.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5v2' />
        <path d='M6 6.5 6.8 20a1.6 1.6 0 0 0 1.6 1.5h7.2A1.6 1.6 0 0 0 17.2 20L18 6.5' />
        <path d='M10.5 11v6M13.5 11v6' />
    </>
));

export const HeadphonesIcon = icon(() => (
    <>
        <path d='M4 14v-2a8 8 0 0 1 16 0v2' />
        <path d='M4 14.5a2.5 2.5 0 0 1 2.5-2.5H8v7H6.5A2.5 2.5 0 0 1 4 16.5z' />
        <path d='M20 14.5a2.5 2.5 0 0 0-2.5-2.5H16v7h1.5a2.5 2.5 0 0 0 2.5-2.5z' />
    </>
));

export const ClockIcon = icon(() => (
    <>
        <circle cx={12} cy={12} r={9} />
        <path d='M12 7v5.2l3.2 2' />
    </>
));

export const AlertCircleIcon = icon(() => (
    <>
        <circle cx={12} cy={12} r={9} />
        <path d='M12 7.5v5.2' />
        <path d='M12 16.3v.2' />
    </>
));

export const CheckCircleIcon = icon(() => (
    <>
        <circle cx={12} cy={12} r={9} />
        <path d='M8.2 12.2l2.6 2.6 5-5.2' />
    </>
));

export const MenuIcon = icon(() => <path d='M4 7h16M4 12h16M4 17h16' />);

export const ChevronDownIcon = icon(() => <path d='M6 9.5l6 6 6-6' />, { strokeWidth: 1.5 });

export const LockIcon = icon(() => (
    <>
        <rect x={4.5} y={10.5} width={15} height={10.5} rx={2.4} />
        <path d='M8 10.5V7.5a4 4 0 0 1 8 0v3' />
    </>
));

export const ZapIcon = icon(() => <path d='M13.5 2.5 5 13.5h6l-.5 8L19 10.5h-6z' />);

/** Apple logo — the one mark on the site that isn't ours to redraw. */
export const AppleGlyph = ({ size = 16, className }: { size?: number; className?: string }) => (
    <svg
        viewBox='0 0 24 24'
        width={size}
        height={size}
        className={className}
        fill='currentColor'
        aria-hidden
        focusable={false}
    >
        <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
    </svg>
);
