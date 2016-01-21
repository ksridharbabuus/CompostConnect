using Microsoft.WindowsAzure.Mobile.Service;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CompostConnect.DataObjects
{
    public class User : EntityData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        
        //Dealer,Farmer,Admin
        public string UserType { get; set; }
        public string Password { get; set; }

        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        [JsonIgnore]
        public virtual ICollection<ConsumerPick> ConsumerPicks { get; set; }

    }
}