using Microsoft.WindowsAzure.Mobile.Service;
using Newtonsoft.Json;
using System;

namespace CompostConnect.DataObjects
{
    public class ConsumerPick : EntityData
    {
        public string SourceId { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        //Requested,picked,Ignored
        public string PickStatus { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        [JsonIgnore]
        public virtual Source Source { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }


    }
}