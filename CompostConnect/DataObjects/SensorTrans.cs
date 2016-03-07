using Microsoft.WindowsAzure.Mobile.Service;
using Newtonsoft.Json;

namespace CompostConnect.DataObjects
{
    public class SensorTrans : EntityData
    {
        public string SensorId { get; set; }
        public string SensorVal { get; set; }
        public string TransDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        [JsonIgnore]
        public virtual Sensor Sensor{ get; set; }

    }
}