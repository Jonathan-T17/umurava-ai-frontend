// export default function Navbar({
//   isSidebarOpen,
//   toggleSidebar,
// }: {
//   isSidebarOpen: boolean;
//   toggleSidebar: () => void;
// }) {
//   return (
//     <nav className="w-full bg-blue-700 text-white shadow-md px-6 py-4 flex justify-between items-center">
//       <h1 className="text-2xl font-bold text-white">Umurava AI Recruiter</h1>
//       <div className="flex gap-4 items-center">
//         <button
//           onClick={toggleSidebar}
//           className="text-2xl focus:outline-none"
//         >
//           {isSidebarOpen ? "✕" : "☰"}
//         </button>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
//           Recruiter Dashboard
//         </button>
//       </div>
//     </nav>
//   );
// }



import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <nav className="w-full bg-blue-700 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Umurava AI Recruiter</h1>
      <div className="flex gap-4 items-center">
        <button onClick={toggleSidebar} className="w-8 h-8">
          {isSidebarOpen ? (
            <XMarkIcon className="w-8 h-8 text-white" />
          ) : (
            <Bars3Icon className="w-8 h-8 text-white" />
          )}
        </button>
      </div>
    </nav>
  );
}
