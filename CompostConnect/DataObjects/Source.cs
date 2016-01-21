using Microsoft.WindowsAzure.Mobile.Service;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CompostConnect.DataObjects
{
    public class Source : EntityData
    {
        public string Address { get; set; }

        public string ContactName { get; set; }
        public string ContactNum { get; set; }
        public string AltContactNum1{ get; set; }
        public string AltContactNum2 { get; set; }
        //Appartment,Hotel
        public string SourceType { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        [JsonIgnore]
        public virtual ICollection<SourceSensorMap> SourceSensorMap { get; set; }
        

    }
}