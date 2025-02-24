/**
 * Soil Moisture Sensor with LM393
 */
//% color=#3eb0e0 icon="\uf043" block="Soil Moisture" weight=1
namespace soilMoisture {
    export type MoisturePins = AnalogPin.P0 | AnalogPin.P1 | AnalogPin.P2;

    /**
     * Soil moisture value type
     */
    export enum ValueType {
        //% block="moisture (0~1023)" enumval=0
        RAW,
        //% block="moisture (0~100%)" enumval=1
        PERCENTAGE
    }

    /**
     * Get soil moisture sensor value
     * @param pin Analog pin connected to sensor
     * @param valueType Select raw value or percentage
     */
    //% blockId="readSoilMoisture" block="soil moisture %valueType| at pin %pin"
    //% tooltip="Reads the soil moisture level from sensor connected to the specified analog pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=2
    //% pin.fieldOptions.width=220
    //% pin.fieldOptions.tooltips="false"
    //% pin.fieldOptions.shared=true
    export function soilMoistureValue(valueType: ValueType, pin: MoisturePins): number {
        // Read analog value
        let moisture = pins.analogReadPin(pin)

        // Ensure the reading is within valid range
        moisture = Math.constrain(moisture, 0, 1023)

        switch (valueType) {
            case ValueType.RAW:
                return moisture
            case ValueType.PERCENTAGE:
                // Convert to percentage (inverted as more moisture = lower resistance)
                // Typically: Dry soil > 800, Water ~ 300
                return Math.map(moisture, 800, 300, 0, 100)
            default:
                return 0
        }
    }
}