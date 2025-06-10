import '../src/index.css';

export const decorators = [
  Story => (
    <div className="flex min-h-screen items-center justify-center bg-[#133334] p-8">
      <div className="w-full max-w-md rounded-2xl bg-[#1A1A1A] p-8">
        <Story />
      </div>
    </div>
  ),
];
