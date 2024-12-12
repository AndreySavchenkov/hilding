interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900">
      {children}
    </div>
  );
}; 