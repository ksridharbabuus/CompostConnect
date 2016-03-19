using Microsoft.WindowsAzure.Mobile.Service;
using Newtonsoft.Json;
using System;

namespace CompostConnect.DataObjects
{
    public class SourceSensorMap : EntityData
    {
        public string SourceId { get; set; }
        public string SensorId { get; set; }
        public DateTime DateOfInstallation { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        [JsonIgnore]
        public virtual Source Source { get; set; }
        [JsonIgnore]
        public virtual Sensor  Sensor { get; set; }

    

    }

}