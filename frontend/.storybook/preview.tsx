import '../src/index.css';

export const decorators = [
  Story => (
    <div className="min-h-screen p-8 bg-[#133334] flex items-center justify-center">
      <div className="bg-[#1A1A1A] p-8 rounded-2xl w-full max-w-md">
        <Story />
      </div>
    </div>
  ),
];
