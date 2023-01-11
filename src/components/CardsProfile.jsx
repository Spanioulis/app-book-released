const CardsProfile = () => {
   return (
      <div className="card-content">
         <div class="card">
            <div class="imgBx">
               <img src="https://i.pinimg.com/564x/29/a2/07/29a20770155957f6b3196fee2968bdea.jpg" />
            </div>
            <div class="content">
               <div class="details">
                  <h2>
                     Raja Junaid
                     <br />
                     <span>HTML & CSS Developer</span>
                  </h2>
                  <div class="data">
                     <h3>
                        58
                        <br />
                        <span>Posts</span>
                     </h3>
                     <h3>
                        2,859
                        <br />
                        <span>Followers</span>
                     </h3>
                     <h3>
                        40
                        <br />
                        <span>Following</span>
                     </h3>
                  </div>
                  <div class="actionBtn">
                     <button>Follow</button>
                     <button>Message</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CardsProfile;
