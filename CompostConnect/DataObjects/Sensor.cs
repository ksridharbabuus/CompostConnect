using Microsoft.WindowsAzure.Mobile.Service;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CompostConnect.DataObjects
{
    public class Sensor : EntityData
    {
        public string SensorName { get; set; }
        public string Description { get; set; }
        public bool   IsActive { get; set; }
        [JsonIgnore]
        public virtual ICollection<SourceSensorMap> SourceSensorMap { get; set; }
        [JsonIgnore]
        public virtual ICollection<SensorTrans> SensorTrans { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }


    }
}