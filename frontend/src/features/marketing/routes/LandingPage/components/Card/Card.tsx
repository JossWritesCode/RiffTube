export interface CardProps {
  number: number;
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

function Card({ number, title, Icon, children }: CardProps) {
  return (
    <div className="min-w-0 bg-flicker-white rounded-lg border-4 border-backstage p-6 flex flex-col items-center text-center">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-backstage text-white grid place-items-center font-semibold">
          {number}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <Icon aria-hidden="true" className="h-12 w-12 mb-4" />
      <p className="text-base">{children}</p>
    </div>
  );
}

export default Card;
