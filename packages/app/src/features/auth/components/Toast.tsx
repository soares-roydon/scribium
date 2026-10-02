interface Props {
   type: 'success' | 'error' | 'info';
   message: string;
}
const Toast = ({ type, message }: Props) => {
   function getIcon() {
      if (type === 'success') {
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
               />
            </svg>
         );
      }

      if (type === 'error') {
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
               />
            </svg>
         );
      }

      if (type === 'info') {
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
               />
            </svg>
         );
      }
   }

   function getMessageColor() {
      if (type === 'success') {
         return 'bg-green-50 text-green-500 font-semibold';
      }
      if (type === 'error') {
         return 'bg-red-50 text-red-500 font-semibold';
      }
      if (type === 'info') {
         return 'bg-orange-50 text-orange-500 font-semibold';
      }
   }

   return (
      <>
         <div
            className={`flex gap-2 items-center px-2 py-1 border rounded-md text-sm ${getMessageColor()}`}
         >
            <div>{getIcon()}</div>
            <div>{message}</div>
         </div>
      </>
   );
};

export default Toast;
